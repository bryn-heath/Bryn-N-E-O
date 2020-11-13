import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StarsIcon from '@material-ui/icons/Stars';
import SearchIcon from '@material-ui/icons/Search';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import EventIcon from '@material-ui/icons/Event';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: 'grey',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function MenuDrop({ handleLogout, setPage }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
      >
        Menu
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => setPage(0)}>
          <ListItemIcon>
            <PhotoCameraIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image of the day" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => setPage(1)}>
          <ListItemIcon>
            <SearchIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Asteroid Search" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => setPage(2)}>
          <ListItemIcon>
            <StarsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Favorites" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => setPage(3)}>
          <ListItemIcon>
            <EventIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Approach Dates" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => handleLogout()}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
