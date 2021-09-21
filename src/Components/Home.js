import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import VehicleInformationForm from "./VehicleInformationForm";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
// import Image from "material-ui-image";

const useStyles = makeStyles(() => ({
  box: {
    width: "100vw",
    height: "50vh",
    background: "#ffdd9b",
  },
  container: {
    textAlign: "center",
    marginBottom: 100,
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box className={classes.box}></Box>
      <Container className={classes.container}>
        <h1>Find My Parts</h1>
        <p>Search by Vehicle</p>
        <VehicleInformationForm />
      </Container>
    </React.Fragment>
  );
}
