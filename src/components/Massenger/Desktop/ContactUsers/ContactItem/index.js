import { Divider, Grid, Skeleton, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import pic from "../../../../../assets/userAvatar.png";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import { format } from "timeago.js";
import useWidthDimensions from "../../../../../Hook/useWidthDimensions";
import "./contactList.css";
import { useSelector, useDispatch } from "react-redux";
import {  sendReciverUser, updateConversationId } from "../../../../../Redux";
import axios from "axios";

function Index(props) {
  const dispatch = useDispatch();
  const { width } = useWidthDimensions();
  const [xs, setXs] = useState({ small: 3, big: 9 });
  const currentUser = useSelector((state) => state.userState.user);
  const token = localStorage.getItem("token");
  const [usersData, setUsersData] = useState({});
  useEffect(() => {
    const users = props.data?.members?.find((user) => user !== currentUser._id);
    const getUserData = async () => {
      if (users) {
        try {
          const res = await axios.get(`/user/allUsers/${users}`, {
            headers: { authorization: `Bearer ${token}` },
          });
          setUsersData(res.data);
        } catch (error) {
          console.log(error.response);
        }
      }
    };
    getUserData();
  }, [currentUser, props, token]);

  useEffect(() => {
    if (width <= 1300 && width > 700) {
      setXs({ small: 1, big: 11 });
    } else {
      setXs({ small: 3, big: 9 });
    }
  }, [width]);

  const subtitleHandler = () => {
    if (xs.small === 1) {
      return "";
    } else {
      if (usersData.bio === "") {
        return "Hi , I'm ready to chat!";
      } else {
        return usersData.bio;
      }
    }
  };

  return (
    <>
      {props.active ? (
        <ChatItem
          avatar={usersData.pic === "" ? pic : usersData.pic}
          alt={"conversation users"}
          title={xs.small === 1 ? "" : usersData.name}
          subtitle={subtitleHandler()}
          dateString={format(props.data.createdAt)}
          unread={xs.small === 1 ? 0 : 2}
          avatarFlexible={true}
          statusText=""
          onClick={() => {
            dispatch(updateConversationId({ conversationId: props.data._id }));
            dispatch(sendReciverUser({ userId: usersData._id }));
          }}
        />
      ) : (
        <Stack spacing={1}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container alignItems="center">
                <Grid
                  item
                  sx={xs.small === 1 ? { mr: 0, mb: 3 } : { mr: 2, mb: 0 }}
                >
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
