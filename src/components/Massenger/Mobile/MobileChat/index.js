import { Grid } from '@mui/material'
import React, { useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessages'
import ChatFooter from './ChatFooter'
import AccModal from '../../Desktop/Modal'
function Index() {
    const [height , setHeight] = useState(false)
    const changeHeight =(e)=>{
        setHeight(e)
    }
    return (
        <>
        <AccModal />
        <Grid container direction="column" style={{overflow:"hidden" , width:"100%" }} sx={height ? {height:"unset"} : {height:"100vh"}}>
            <Grid item xs={1} sx={{bgcolor:"#2F3135" , width:"100%" , height:"100%" }}>
                <ChatHeader /> 
            </Grid>
            <Grid item xs={10} sx={{ bgcolor:"#363A3F" , overflowY:"auto" , height:"100%"  , width:"100%"}}>
               <ChatMessage />
            </Grid>
            <Grid item xs={1} sx={{bgcolor:"#363A3F", overflow:"hidden"  , width:"100%"}}>
                <ChatFooter changeHeight={changeHeight} />
            </Grid>
        </Grid>
</>
    )
}

export default Index
