import { MoreHoriz } from '@mui/icons-material'
import { Avatar, Grid, Typography } from '@mui/material'
import React from 'react'
import Pic from '../../../../../assets/img2.png'
function Index() {
    return (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Grid container>
              <Grid item>
                <Avatar src={Pic} alt="user" sx={{ width: 80, height: 80 }} style={{cursor:"pointer"}}/>
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
            >
              <MoreHoriz style={{ color: "#fff" }} fontSize="large" />
            </div>
          </Grid>
        </Grid>
    )
}

export default Index
