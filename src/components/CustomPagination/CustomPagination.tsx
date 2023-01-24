import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";

const styles = () => ({
  paginationRoot: {
    "& ul": {
      justifyContent: "center",
    },
  },
});
type Props = { pagesCount: number };
const CustomPagination = (props: Props) => {
  const { pagesCount } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const sx = styles();
  return (
    <Pagination
      sx={sx.paginationRoot}
      page={page}
      color="secondary"
      size="large"
      count={pagesCount}
      showFirstButton
      showLastButton
      onChange={(_e, page) => {
        setSearchParams({ page: `${page}` });
      }}
    />
  );
};

export default CustomPagination;
