import { Menu, Search } from '@mui/icons-material'
import { Container, Grid, Typography  } from '@mui/material'
import React from 'react'
import {useDispatch} from 'react-redux'
import { modalHandler } from '../../../../Redux/'

function Index(props) {
 const dispatch = useDispatch()
    return (
   
        <Grid container sx={{width:"100%" , height:"100%"}} alignItems="center">
        <Container >
            <Grid container justifyContent="space-between" >
                <Grid item>
                    <Menu sx={{color:"#fdfdfd"}} onClick={props.drawer('left' , true)} />
                </Grid>
                <Grid item >
                    <Typography sx={{color:"#fdfdfd"}}>Recent</Typography>
                </Grid>
                <Grid item>
                    <Search sx={{color:"#fdfdfd"}} onClick={()=>dispatch(modalHandler({state:true , label:'mobileSearch'}))}/>
                </Grid>
            </Grid>
        </Container>
        </Grid>
        
    )
}

export default Index
