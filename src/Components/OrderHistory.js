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
  createData(
    0,
    "1234",
    "231",
    "JK Jeep Wrangler Street Series Axle-Back Performance Exhaust System",
    "705",
    "10"
  ),
  createData(
    1,
    "2345",
    "534",
    "Lexus California Grade CARB Compliant Manifold Catalytic Converter",
    "1,634",
    "25"
  ),
  createData(
    2,
    "3456",
    "436",
    '4" X 9" Oval Center/Offset Straight Through Performance Muffler',
    "102",
    "3"
  ),
  createData(3, "4567", "723", "Stainless Steel Tru-X Pipe", "116", "3"),
];

export default function OrderHistory() {
  return (
    <React.Fragment>
      <Title>Order History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell>Part Number</TableCell>
            <TableCell>Part Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Bubba Bucks Awarded</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.year}</TableCell>
              <TableCell>{row.make}</TableCell>
              <TableCell>{row.model}</TableCell>
              <TableCell>${row.subModel}</TableCell>
              <TableCell>{row.engine}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
