import { Menu, Search } from '@mui/icons-material'
import { Container, Grid, Typography  } from '@mui/material'
import React from 'react'
import {useDispatch} from 'react-redux'
<<<<<<< HEAD
import { modalState } from '../../../../Redux/modalSlice'
=======
import { modalState } from '../../../../Redux'
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c

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
<<<<<<< HEAD
                    <Search sx={{color:"#fdfdfd"}} onClick={()=>dispatch(modalState({state:true , label:'mobileSearch'}))}/>
=======
                    <Search sx={{color:"#fdfdfd"}} onClick={()=>dispatch(modalState(true , 'mobileSearch'))}/>
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
                </Grid>
            </Grid>
        </Container>
        </Grid>
        
    )
}

export default Index
