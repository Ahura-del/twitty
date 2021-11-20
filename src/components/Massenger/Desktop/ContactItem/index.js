import { Divider, Grid, Skeleton, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import pic from "../../../../assets/img2.png";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import useWidthDimensions from "../../../../Hook/useWidthDimensions";
import "./contactList.css";
function Index(props) {
  const { width } = useWidthDimensions();
  const [xs, setXs] = useState({ small: 3, big: 9 });
  useEffect(() => {
    if (width <= 1300 && width > 700) {
      setXs({ small: 1, big: 11 });
    } else {
      setXs({ small: 3, big: 9 });
    }
  }, [width]);

  return (
    <>
      {/* <ListItem alignItems="center" className="list-item">
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
      </ListItem> */}

      {props.active ? (
        <ChatItem
          avatar={pic}
          alt={"Reactjs"}
          title={xs.small === 1 ? "" : "Facebook"}
          subtitle={xs.small === 1 ? "" : "What are you doing?"}
          date={new Date()}
          unread={xs.small === 1 ? 0 : 2}
          avatarFlexible={true}
          statusText=""
          statusColor={xs.small === 1 ? null : "green"}
        />
      ) : (
        <Stack spacing={1}>
          <Grid container alignItems="center">
            <Grid item sx={xs.small === 1 ? null : { mr: 2 }}>
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ bgcolor: "grey.500" }}
              />
            </Grid>
            <Grid item>
              <Skeleton
                variant="text"
                className="skeleton-text"
                sx={{ bgcolor: "grey.500" }}
              />
              <Skeleton
                variant="text"
                className="skeleton-text"
                width={400}
                height={40}
                sx={{ bgcolor: "grey.500" }}
              />
            </Grid>
          </Grid>
        </Stack>
      )}

      <Divider
        style={{ background: "gray", marginTop: 15, marginBottom: 15 }}
        className="divider"
      />
    </>
  );
}

export default Index;
