import {
  Avatar,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import pic from "../../../../assets/img2.png";
import "./contactList.css";
function index() {
  return (
    <>
      <ListItem alignItems="center" className="list-item">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={pic} sx={{ width: 56, height: 56 }} />
        </ListItemAvatar>
        <ListItemText
          className="list-text-area"
          style={{ color: "white", marginLeft: 20 }}
          primary="Tedi"
          secondary={
            <>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    style={{ color: "gray", marginTop: "10px" }}
                  >
                    Hi , how are ...
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    style={{ color: "gray", marginTop: "10px" }}
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                  >
                    Online
                  </Typography>
                </Grid>
              </Grid>
            </>
          }
        />
      </ListItem>
      <Divider
        style={{ background: "gray", marginTop: 15, marginBottom: 15 }}
        className="divider"
      />
    </>
  );
}

export default index;
