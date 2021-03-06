import { Add, Menu, Search } from "@mui/icons-material";
import { Container, Fab, Grid, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomListItem from "./ContactItem/ContactItem";
import useWidthDimensions from "../../../../Hook/useWidthDimensions";
import { useDispatch} from "react-redux";
import { modalHandler } from "../../../../Redux";
function ContactUsers(props) {
  //-----------redux---------------

  const dispatch = useDispatch();
  //---------fab style and setting-----------
  const fabStyle = {
    large: {
      right: 50,
      position: "absolute",
      bottom: 50,
      background: "#FF6B00",
      zIndex: 10,
    },
    small: {
      right: "50%",
      transform: `translateX(50%) `,
      position: "absolute",
      bottom: 50,
      background: "#FF6B00",
    },
  };


  const fabModal = () => {
    dispatch(modalHandler({ state: true, label: "fab" }));
  };

  //-------------getData --------------------
  const [loading, setLoading] = useState(false);
  const [chatListState, setChatListState] = useState("");
  const [chatList, setChatList] = useState([]);
 
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);
    if (props.chatList.length === 0) {
      setChatListState("empty");
    } else {
      setChatListState("");
      setChatList(props.chatList);
    }
  }, [props.chatList]);



  //-------------WidthDimensions------------

  const { width } = useWidthDimensions();
  const [xs, setXs] = useState({ small: 3, big: 9 });
  useEffect(() => {
    if (width <= 1300 && width >= 700) {
      setXs({ small: 1, big: 11 });
    } else {
      setXs({ small: 3, big: 9 });
    }
  }, [width]);

  //---------search input visible------------
  const [searchVisible, setSearchVisible] = useState(false);
  const searchInputStyle = {
    show: {
      visibility: "visible",
      width: "100%",
      fontSize: 16,
    },
    hide: {
      visibility: "hidden",
      width: 0,
      fontSize: 16,
    },
  };

  return (
    <>
      {xs.small === 3 ? (
        <Grid
          container
          direction="column"
          sx={{ height: "100vh", width: "100%" }}
        >
          <Grid item xs={1} width="100%" height="100%">
            <Container>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                className="trigger-area"
              >
                <Grid item>
                  <Menu
                    style={{ color: "white", cursor: "pointer" }}
                    fontSize="medium"
                    onClick={props.drawerHandle("left", true)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <input
                    type="text"
                    name="searchInput"
                    autoComplete="off"
                    id="searchInput"
                    style={
                      searchVisible
                        ? searchInputStyle.show
                        : searchInputStyle.hide
                    }
                    placeholder="Search..."
                  />
                </Grid>
                <Grid item className="search-area">
                  <Search
                    style={{ color: "white", cursor: "pointer" }}
                    fontSize="medium"
                    onClick={() => setSearchVisible(!searchVisible)}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Typography
                  className="recent-text"
                  component="p"
                  style={{
                    color: "white",
                    marginTop: 10,
                    // marginBottom: 10,
                    fontWeight: "bold",
                    fontSize: 22,
                  }}
                >
                  Recent
                </Typography>
              </Grid>
            </Container>
          </Grid>
          <Grid item xs={10} sx={{ overflowY: "auto", width: "100%" }}>
            <Container>
              <Grid item sx={{ overflowY: "auto" }}>
                <List className="list-container" sx={{ width: "100%" }}>
                  {chatListState === "empty" ? (
                    <Typography
                      style={{ color: "#ccc", marginTop: 20 }}
                      fontSize={28}
                      textAlign="center"
                    >
                      Empty Chat!
                    </Typography>
                  ) : (
                    <>
                      {chatList?.map((c, idx) => (
                        <CustomListItem key={idx} data={c} active={loading}  />
                      ))}
                    </>
                  )}
                </List>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid
            container
            columnSpacing={{ xs: 10 }}
            justifyContent="center"
            alignItems="center"
            className="triger-area"
          >
            <Grid item>
              <Menu
                style={{
                  color: "white",
                  cursor: "pointer",
                  marginBottom: 15,
                }}
                fontSize="medium"
                onClick={props.drawerHandle("left", true)}
              />
            </Grid>

            <Grid item>
              <List style={{ background: "transparent" }}>

                {chatListState === "" ? (
                  <>
                      {chatList.map((c, idx) => (
                        <CustomListItem key={idx} data={c} active={loading}  />
                      ))}
                    </>
                ) : null}
              
              </List>
            </Grid>
          </Grid>
        </>
      )}
      <Fab
        className="fab-btn"
        style={xs.small === 3 ? fabStyle.large : fabStyle.small}
        onClick={fabModal}
      >
        <Add style={{ color: "white" }} fontSize="large" />
      </Fab>
    </>
  );
}

export default ContactUsers;
