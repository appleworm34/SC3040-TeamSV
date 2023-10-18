import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// code | current_index | desired_index | status
// const exampleStudentModule = {
//     "CC0001": ["10101", ["10102", "10103"], "Pending"],
//     "MH1810": ["20202", ["20203", "20204"], "Pending"],
//     "SP0061": ["30303", ["30301"], "Pending"]
// }


export default function BasicTable(props) {
    const headers = props.headers
    const rows = props.rows
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
                <TableCell key={header} align="right">{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            {headers.map((header) => (
                <TableCell key={header} align='right'>
                {Array.isArray(row[header]) ? (
                  row[header].map((value, index) => (
                    <div key={index}>{value}</div>
                  ))
                ) : (
                  row[header]
                )}
              </TableCell>
            ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}