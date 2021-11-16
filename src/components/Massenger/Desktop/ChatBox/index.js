import React from "react";
import {  Container, Grid } from "@mui/material";
import ChatHeader from './ChatHeader'
function Index() {
  return (
    <Grid container>
      <Container style={{ paddingTop: 30, paddingBottom: 30 }} fixed>
        <ChatHeader />
      </Container>
    </Grid>
  );
}

export default Index;
