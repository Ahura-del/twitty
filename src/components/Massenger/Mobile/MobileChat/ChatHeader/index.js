import { ArrowBack, MoreVert } from '@mui/icons-material'
import { Avatar, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import pic from '../../../../../assets/img2.png'
function Index() {
    return (
       <Container style={{height:"100%"}}>
           <Grid container justifyContent="space-between" alignItems="center" style={{height:"100%"}}>
            <Grid item >
            <Grid container alignItems="center" >
                <Grid item>
                <ArrowBack sx={{color:"#fdfdfd" , mr:2}} />
                </Grid>
                <Grid item>
                <Grid container>
                    <Grid item sx={{mr:2}}>
                        <Avatar src={pic} alt="user avatar" sx={{width:50 , height:50}}  />
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" sx={{height:"100%"}} justifyContent="space-between">
                            <Grid item>
                                <Typography sx={{color:"#fdfdfd"}}>
                                    Ahura
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{color:"#999" , fontSize:14}}>
                                    Online
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
                
            </Grid>
            <Grid item>
                <MoreVert sx={{color:"#fdfdfd"}} />
            </Grid>
           </Grid>
       </Container>
    )
}

export default Index
