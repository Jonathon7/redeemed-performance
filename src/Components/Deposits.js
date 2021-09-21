import React from "react";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

export default function Deposits(props) {
  return (
    <React.Fragment>
      <Title>Bubba Bucks</Title>
      <Typography component="p" variant="h4">
        {props.bubbaBucks}
      </Typography>
    </React.Fragment>
  );
}
