import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import { AppBar, Toolbar, Button, IconButton } from "@material-ui/core";
import {
  HomeRounded,
  ShoppingCartRounded,
  AccountCircleRounded,
  MenuRounded,
} from "@material-ui/icons";

export default function NavBar(props) {
  const Auth = localStorage.getItem("jwt-cookie");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const moderateurLinks = () => {
    if (props.type === "administrateur" || props.type === "moderateur") {
      return (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          edge="start"
          className={clsx(
            props.classes.menuButton,
            props.open && props.classes.hide
          )}
        >
          <MenuRounded />
        </IconButton>
      );
    }
  };

  const clientLinks = (
    <MenuList
      autoFocusItem={open}
      id="menu-list-grow"
      onKeyDown={handleListKeyDown}
    >
      <MenuItem
        onClick={() => {
          window.location = "/Historique";
          setOpen(false);
        }}
        color="inherit"
      >
        Historique
      </MenuItem>
      <MenuItem
        onClick={async () => {
          window.location = "/Compte";
          setOpen(false);
        }}
        color="inherit"
      >
        Compte
      </MenuItem>
      <MenuItem
        onClick={async () => {
          await localStorage.removeItem("jwt-cookie");
          window.location = "/Connexion";
        }}
        color="inherit"
      >
        Déconnexion
      </MenuItem>
    </MenuList>
  );
  const visiteurLinks = (
    <MenuList
      autoFocusItem={open}
      id="menu-list-grow"
      onKeyDown={handleListKeyDown}
    >
      <MenuItem
        onClick={() => {
          window.location = "/Inscription";
          setOpen(false);
        }}
        color="inherit"
      >
        Inscription
      </MenuItem>
      <MenuItem
        onClick={() => {
          window.location = "/Connexion";
          setOpen(false);
        }}
        color="inherit"
      >
        Connexion
      </MenuItem>
    </MenuList>
  );

  return (
    <div className={props.classes.root}>
      <AppBar
        position="static"
        className={clsx(props.classes.appBar, {
          [props.classes.appBarShift]: props.open,
        })}
      >
        <Toolbar>
          {moderateurLinks()}
          <Button
            onClick={() => {
              window.location = "/";
            }}
            color="inherit"
          >
            B&B Booking
          </Button>
          <div className={props.classes.title}></div>
          <Button
            onClick={() => {
              window.location = "/";
            }}
            color="inherit"
          >
            <HomeRounded />
          </Button>
          <Button
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            <AccountCircleRounded />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    {Auth ? clientLinks : visiteurLinks}
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <Button
            onClick={() => {
              window.location = "/Panier";
            }}
            color="inherit"
          >
            <ShoppingCartRounded />
          </Button>
        </Toolbar>
      </AppBar>

    </div>
  );
}
