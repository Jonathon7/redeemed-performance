import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Modal from "@material-ui/core/Modal";
import Title from "./Title";
import VehicleInformationForm from "./VehicleInformationForm";

const useStyles = makeStyles((theme) => ({
  modal: {
    marginTop: 50,
  },
}));

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

export default function YourVehicles() {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <Grid container justifyContent="space-between" alignItems="center">
        <Title>Your Vehicles</Title>
        <IconButton>
          <AddCircleIcon
            style={{ color: "#fcb022" }}
            fontSize="medium"
            onClick={toggleModal}
          />
        </IconButton>
      </Grid>
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
      <Modal open={open} onClose={toggleModal} className={classes.modal}>
        <VehicleInformationForm />
      </Modal>
    </React.Fragment>
  );
}
