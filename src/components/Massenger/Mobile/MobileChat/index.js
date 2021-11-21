import { Grid } from '@mui/material'
import React from 'react'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessages'
function Index() {
    return (
        <Grid container direction="column" style={{height:"100vh" , overflow:"hidden" , width:"100%"}}>
            <Grid item xs={1} sx={{bgcolor:"#2F3135" , width:"100%" , height:"100%"}}>
                <ChatHeader /> 
            </Grid>
            <Grid item xs={10} sx={{pt:1 , bgcolor:"#363A3F" , overflowY:"auto" , height:"100%"  , width:"100%"}}>
               <ChatMessage />
            </Grid>
            <Grid item xs={1} sx={{bgcolor:"blue"}}>
                <p>chat footer</p>
            </Grid>
        </Grid>
    )
}

export default Index
