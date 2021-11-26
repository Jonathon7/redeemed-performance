import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Link from "@material-ui/core/Link";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemButton from "@material-ui/core/ListItemButton";
import ListItemText from "@material-ui/core/ListItemText";
// import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  listItem: {
    width: 250,
  },
}));

export default function Menu(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Drawer anchor={"left"} open={props.open} onClose={props.toggleDrawer}>
        <List>
          {props.links.map((elem, index) => {
            return (
              <ListItem className={classes.listItem} button={true} key={index}>
                <ListItemText primary={elem.title} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </React.Fragment>
  );
}
