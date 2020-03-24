import React from "react";
import {
  makeStyles
} from "@material-ui/core/styles";
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList
} from "@material-ui/core";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import {
  HomeRounded,
  ShoppingCartRounded,
  AccountCircleRounded
} from "@material-ui/icons";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  paper: {
    marginRight: theme.spacing(2)
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const Auth = localStorage.getItem("jwt-cookie");
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
  const handleClose = event => {
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
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
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
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography className={classes.title} color="inherit">
              Logo
            </Typography>
            <Button
              onClick={() => {
                window.location = "/";
              }}
              color="inherit"
            >
              <HomeRounded />
            </Button>
            <div>
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
                        placement === "bottom" ? "center top" : "center bottom"
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
            </div>
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
