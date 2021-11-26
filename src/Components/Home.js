import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import VehicleInformationForm from "./VehicleInformationForm";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

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
        <Typography>Find My Parts</Typography>
        <Typography>Search By Vehicle</Typography>
        <VehicleInformationForm partFinder={true} />
      </Container>
    </React.Fragment>
  );
}
