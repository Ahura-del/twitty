import React from "react";
import { CircularProgress, Grid } from "@mui/material";

function Index() {
  return (
    <Grid container sx={{ width: "100%", height: "100vh", bgcolor: "#111" }}>
      <Grid
        item
        xs={12}
        sx={{ width: "100%", height: "100%", display: "flex" }}
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
}

export default Index;
