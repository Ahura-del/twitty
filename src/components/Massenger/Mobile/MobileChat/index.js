import { Grid } from '@mui/material'
import React from 'react'
import ChatHeader from './ChatHeader'
function Index() {
    return (
        <Grid container direction="column" style={{height:"100vh" , overflow:"hidden" , width:"100%"}}>
            <Grid item xs={1} sx={{bgcolor:"#2F3135" , width:"100%" , height:"100%"}}>
                <ChatHeader /> 
            </Grid>
            <Grid item xs={10}>
                <p>chat message</p>
            </Grid>
            <Grid item xs={1}>
                <p>chat footer</p>
            </Grid>
        </Grid>
    )
}

export default Index
