import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  typography: {
    marginLeft: theme.spacing(1),
  },
}));

export default function UserInfo(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container alignItems="center" classes={classes.grid}>
        <Avatar
          src="https://source.unsplash.com/random"
          alt={props.username}
          className={classes.avatar}
        />
        <Grid item>
          <Typography className={classes.typography} component="p" variant="h6">
            {props.username}
          </Typography>
          <Typography className={classes.typography} component="p" variant="h6">
            {props.membershipDate}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
