import {
  Avatar,
  Badge,
  Divider,
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
              <Typography
                component="span"
                variant="body2"
                style={{
                  color: "gray",
                  marginTop: "10px",
                  display: "inline-block",
                }}
              >
                Hi , how are ...
              </Typography>
            </>
          }
        />
        <ListItemText
          className="list-text-area"
          style={{ color: "white", marginLeft: 20, textAlign: "right" }}
          primary={
            <>
              <Typography variant="body2" style={{ textAlign: "right" }}>
                <Badge badgeContent={1} color="warning" />
              </Typography>
            </>
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                style={{
                  color: "gray",
                  marginTop: "10px",
                  display: "inline-block",
                  textAlign: "right",
                }}
              >
                Online
              </Typography>
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
