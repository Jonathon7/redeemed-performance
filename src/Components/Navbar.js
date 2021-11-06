import React, { useState } from "react";
import Menu from "./Menu";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  outerGrid: {
    background: "#fcb022",
    padding: 10,
    color: "#fff",
  },
  innerGrid: {
    marginRight: 30,
    width: "fit-content",
  },
  menuIcon: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  logo: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
      marginLeft: 5,
    },
  },
  badge: {
    backgroundColor: "#fff",
    color: "orange",
  },
  iconButton: {
    "&:hover": {
      background: "rgb(255, 255, 255, .2)",
    },

    "&:active": {
      background: "rgb(255, 255, 255, .2)",
    },
  },
  link: {
    padding: theme.spacing(1),
  },
  boxLinks: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const links = [
  { title: "About", url: "/about" },
  { title: "Link", url: "#" },
  { title: "Link", url: "#" },
  { title: "Link", url: "#" },
  { title: "Link", url: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Menu links={links} open={open} toggleDrawer={toggleDrawer} />
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.outerGrid}
      >
        <IconButton className={classes.menuIcon} onClick={toggleDrawer}>
          <MenuIcon style={{ color: "#fff" }} />
        </IconButton>
        <Link
          href="/"
          variant="h5"
          color="inherit"
          className={classes.logo}
          underline="none"
        >
          Redeemed Performance
        </Link>

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={classes.innerGrid}
        >
          <Box className={classes.boxLinks}>
            {links.map((elem, i) => {
              return (
                <Link
                  href={elem.url}
                  key={i}
                  variant="body2"
                  color="inherit"
                  className={classes.link}
                >
                  {elem.title}
                </Link>
              );
            })}
          </Box>
          <IconButton href="/favorite" className={classes.iconButton}>
            <FavoriteIcon style={{ color: "#fff" }} />
          </IconButton>
          <IconButton href="/user" className={classes.iconButton}>
            <AccountCircleOutlinedIcon style={{ color: "#fff" }} />
          </IconButton>
          <IconButton href="#" className={classes.iconButton}>
            <Badge badgeContent={1} classes={{ badge: classes.badge }}>
              <ShoppingCartOutlinedIcon style={{ color: "#fff" }} />
            </Badge>
          </IconButton>
        </Grid>
      </Grid>
    </AppBar>
  );
}
