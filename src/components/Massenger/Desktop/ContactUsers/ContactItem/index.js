import { Divider, Grid, Skeleton, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import pic from "../../../../../assets/img2.png";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import useWidthDimensions from "../../../../../Hook/useWidthDimensions";
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
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container alignItems="center">
                <Grid item sx={xs.small === 1 ? { mr: 0 } : { mr: 2 }}>
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    sx={{ bgcolor: "grey.500" }}
                  />
                </Grid>
                <Grid item>
                  <Skeleton
                    className="skeleton-text"
                    variant="text"
                    sx={{ bgcolor: "grey.500" }}
                  />
                  <Skeleton
                    className="skeleton-text"
                    variant="text"
                    width={200}
                    height={40}
                    sx={{ bgcolor: "grey.500" }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Skeleton
                className="skeleton-text"
                variant="text"
                width={40}
                height={20}
                sx={{ bgcolor: "grey.500", mb: 5 }}
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
