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
  BusinessRounded,
  CategoryRounded,
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

        <ListItem
          button
          key="Categories"
          onClick={() => {
            window.location = "/Categories";
          }}
        >
          <ListItemIcon>
            <CategoryRounded />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>

        <ListItem
          button
          key="Marques"
          onClick={() => {
            window.location = "/Marques";
          }}
        >
          <ListItemIcon>
            <BusinessRounded />
          </ListItemIcon>
          <ListItemText primary="Marques" />
        </ListItem>
      </List>
    </Drawer>
  );
}
