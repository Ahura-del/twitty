import { Clear, DeleteForever, MoreHoriz, Person } from "@mui/icons-material";
import { Avatar, Badge, Grid, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import Pic from "../../../../../assets/img2.png";
function Index() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Grid container>
            <Grid item>
              <Badge
                color="success"
                badgeContent=" "
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Avatar
                  src={Pic}
                  alt="user"
                  sx={{ width:70, height:70 }}
                  style={{ cursor: "pointer" }}
                />
              </Badge>
            </Grid>
            <Grid item style={{ marginLeft: 20 }}>
              <Grid
                container
                direction="column"
                style={{ height: "100%" }}
                justifyContent="space-around"
              >
                <Grid item>
                  <Typography style={{ color: "white" }} fontSize="24px">
                    Ahura
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography style={{ color: "gray" }}>Online</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              background: "#000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            <MoreHoriz style={{ color: "#fff" }} fontSize="large" />
          </div>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
         
          >
            <MenuItem onClick={handleClose}>
            <Person sx={{mr:2}} />
            Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
            <DeleteForever sx={{mr:2}} />
            Delete chat
            </MenuItem>
            <MenuItem onClick={handleClose}>
            <Clear sx={{mr:2}} />
            Clear history
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Index;
