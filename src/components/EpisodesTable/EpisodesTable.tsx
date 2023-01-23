import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { Episode } from "../../gql/graphql";

const styles = () => ({
  rootPaper: { width: "100%", mb: 2, backgroundColor: "lavenderblush" },
  tableRow: { "&:last-child td, &:last-child th": { border: 0 } },
});

const rowsPerPageOptions = [5, 10, 25];

type Props = {
  episodes: Partial<Episode>[];
};
const CustomTable = (props: Props) => {
  const { episodes } = props;
  const sx = styles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const count = episodes.length;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={sx.rootPaper}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Episode Season and Number</TableCell>
              <TableCell align="left">Episode Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {episodes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((episode) => (
                <TableRow key={episode.name} sx={sx.tableRow} role="episodeRow">
                  <TableCell component="th" scope="row" align="left">
                    {episode.episode}
                  </TableCell>
                  <TableCell align="left">{episode.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        role="episodesTablePagination"
      />
    </Paper>
  );
};

export default CustomTable;
