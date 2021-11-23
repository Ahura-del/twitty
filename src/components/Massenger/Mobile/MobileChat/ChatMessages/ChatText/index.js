import { Grid, Typography } from '@mui/material'
import React from 'react'

function Index(props) {
    return (
        <Grid container onContextMenu={()=> alert('hi')} direction="row" sx={{width:"100%"}} justifyContent={props.dir === "recive" ? "flex-start" : "flex-end"}>
        <Grid item sx={{my:1 , maxWidth:"75%" , px:2 , py:1 , borderRadius:10}} style={props.dir==="recive" ? {background:"#FF6B00"} : {background:"#1d1e21"}} >
            <Typography sx={{fontSize:14 , color:"#fdfdfd"}}>
                Lorem ipsum, dolor dferfgr dfedd sit amet 
            </Typography>
      
        </Grid>
        </Grid>
    )
}

export default Index
