import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, year, make, model, subModel, engine) {
  return { id, year, make, model, subModel, engine };
}

const rows = [
  createData(0, "2004", "Dodge", "Ram", "1500", "5.7L"),
  createData(1, "2014", "Toyota", "Corolla", "L/LE", "1.8L"),
  createData(2, "2018", "Chevrolet", "Tahoe", "LT", "5.3L"),
  createData(3, "2019", "Jeep", "Cherokee", "Latitude Plus", "2L"),
];

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Your Vehicles</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Make</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Sub Model</TableCell>
            <TableCell>Engine</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.year}</TableCell>
              <TableCell>{row.make}</TableCell>
              <TableCell>{row.model}</TableCell>
              <TableCell>{row.subModel}</TableCell>
              <TableCell>{row.engine}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
