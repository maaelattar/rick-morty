import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import useTheme from "@mui/styles/useTheme";

import { useForm } from "react-hook-form";
import CustomAutoComplete from "../CustomAutoComplete";
import { autoCompleteOptions } from "./staticAutoCompleteOptions";

const styles = (theme: Theme) => ({
  form: {
    padding: "8px 16px",
    backgroundColor: "ghostwhite",
  },
  gridContainer: {
    justifyContent: "space-between",
  },
  textFiled: {
    justifyContent: "space-between",
  },
  searchIconGridItem: {
    display: "flex",
    justifyContent: "end",
    alignItems: "flex-end",
  },
  searchIconButton: {
    [theme.breakpoints.down("xl")]: {
      width: "100%",
      borderRadius: 0,
    },
  },
});

type SearchFormValues = {
  name: string | null;
  status: string | null;
  species: string | null;
  gender: string | null;
};

type Props = {
  onSubmit: (data: SearchFormValues) => void;
};
const SearchForm = (props: Props) => {
  const { onSubmit } = props;

  const sx = styles(useTheme());

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: null,
      status: null,
      species: null,
      gender: null,
    },
  });

  const renderAutoCompleteInputs = () =>
    autoCompleteOptions.map((input) => (
      <Grid key={input.name} item xs={12} xl={2}>
        <CustomAutoComplete
          options={input.options}
          placeholder={input.placeholder}
          name={input.name}
          register={register}
        />
      </Grid>
    ));

  return (
    <Box>
      <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={sx.form}>
        <Grid container spacing={2} sx={sx.gridContainer}>
          <Grid item xs={12} xl={3}>
            <TextField
              {...register("name")}
              color="primary"
              label="Name"
              variant="standard"
              sx={sx.textFiled}
              InputProps={{ disableUnderline: true }}
            />
          </Grid>

          {renderAutoCompleteInputs()}
          <Grid item xs={12} xl={1} sx={sx.searchIconGridItem}>
            <IconButton
              type="submit"
              sx={sx.searchIconButton}
              role="searchButtonSubmit"
            >
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SearchForm;
