import { Add, Menu, Search } from "@mui/icons-material";
import { Container, Fab, Grid, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomListItem from "./ContactItem";
import useWidthDimensions from "../../../../Hook/useWidthDimensions";
import { useDispatch } from "react-redux";
import { modalState } from "../../../../Redux";
function Index(props) {
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
    dispatch(modalState(true, "fab"));
  };

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
    },
    hide: {
      visibility: "hidden",
      width: 0,
    },
  };

  return (
    <>
      {xs.small === 3 ? (
        <Container
          maxWidth="sm"
          className="container-list"
          style={{ overflow: "hidden" }}
        >
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
                fontSize="large"
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
                  searchVisible ? searchInputStyle.show : searchInputStyle.hide
                }
                placeholder="Search..."
              />
            </Grid>
            <Grid item className="search-area">
              <Search
                style={{ color: "white", cursor: "pointer" }}
                fontSize="large"
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
                marginTop: 20,
                marginBottom: 20,
                fontWeight: "bold",
                fontSize: 30,
              }}
            >
              Recent
            </Typography>
          </Grid>
          <Grid item>
            <List className="list-container" sx={{ width: "100%" }}>
              {/* <Typography style={{color:"#ccc"}} fontSize={30} textAlign="center" >
                Empty Chat!
              </Typography> */}
              <CustomListItem active={true} />
              <CustomListItem active={true} />
              <CustomListItem active={false} />
              <CustomListItem active={false} />
            </List>
          </Grid>
        </Container>
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
                  marginBottom: 20,
                }}
                fontSize="large"
                onClick={props.drawerHandle("left", true)}
              />
            </Grid>

            <Grid item>
              <List style={{ background: "transparent" }}>
                <CustomListItem active={false} />
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

export default Index;
