import React from "react";
import {
  ListItemIcon,
  ListItemText,
  ListItem,
  IconButton,
  Divider,
  Drawer,
  List,
} from "@material-ui/core";
import {
  ChevronLeftRounded,
  ChevronRightRounded,
  PeopleAltRounded,
  ShoppingCartRounded,
} from "@material-ui/icons";

export default function SideBar(props) {
  return (
    <Drawer
      className={props.classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: props.classes.drawerPaper,
      }}
    >
      <div className={props.classes.drawerHeader}>
        <IconButton onClick={props.handleDrawerClose}>
          {props.theme.direction === "ltr" ? (
            <ChevronLeftRounded />
          ) : (
            <ChevronRightRounded />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          key="Clients"
          onClick={() => {
            window.location = "/Clients";
          }}
        >
          <ListItemIcon>
            <PeopleAltRounded />
          </ListItemIcon>
          <ListItemText primary="Clients" />
        </ListItem>
        <ListItem
          button
          key="Articles"
          onClick={() => {
            window.location = "/Articles";
          }}
        >
          <ListItemIcon>
            <ShoppingCartRounded />
          </ListItemIcon>
          <ListItemText primary="Articles" />
        </ListItem>
      </List>
    </Drawer>
  );
}