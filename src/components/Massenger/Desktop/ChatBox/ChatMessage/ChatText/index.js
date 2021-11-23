import { Grid, Typography } from '@mui/material'
import React from 'react'
function Index(props) {
   
    return (
        <Grid item xs={12} >
        <Grid container justifyContent={props.dir === "recive" ? "flex-start" : "flex-end"} >
            <div className="chat-message" style={props.dir === "recive" ? {  background:"#FF6B00"} : {background:"#3F2120"}}>
                <Typography style={{color:"white" , fontSize:20}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id mollitia possimus aut. Ipsa tempora iusto eveniet odio laborum minus ratione!
                </Typography>
            </div>
        </Grid>
        </Grid>
    )
}

export default Index
