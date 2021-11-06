import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import VehicleInformationForm from "./VehicleInformationForm";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

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
  const [test, setTest] = useState("");

  useEffect(() => {
    axios
      .get("/api/makes")
      .then((res) => {
        console.log(res.data);
        setTest(res.data[0].model_make_id);
      })
      .catch((err) => console.log(err));
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      <Box className={classes.box}></Box>
      <Container className={classes.container}>
        {test}
        <h1>Find My Parts</h1>
        <p>Search by Vehicle</p>
        <VehicleInformationForm partFinder={true} />
      </Container>
    </React.Fragment>
  );
}
