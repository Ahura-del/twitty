import { ArrowBack, Clear, DeleteForever, MoreVert, Person } from '@mui/icons-material'
import { Avatar, Container, Grid, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {modalState} from '../../../../../Redux'
import pic from '../../../../../assets/img2.png'
function Index() {

    //-------history-----------------
    const history = useHistory()
  //------------modal----------------
  const dispatch = useDispatch()
  const avatarModal = ()=>{
    dispatch(modalState(true , "avatar"))
    setAnchorEl(null);
  }

    //-----------menu----------------

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    return (
       <Container style={{height:"100%"}}>
           <Grid container justifyContent="space-between" alignItems="center" style={{height:"100%"}}>
            <Grid item >
            <Grid container alignItems="center" >
                <Grid item>
                <ArrowBack sx={{color:"#fdfdfd" , mr:2}} onClick={()=> history.goBack()} />
                </Grid>
                <Grid item>
                <Grid container>
                    <Grid item sx={{mr:2}}>
                        <Avatar src={pic} alt="user avatar" sx={{width:50 , height:50 , cursor:"pointer"}} onClick={avatarModal} />
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
                <MoreVert sx={{color:"#fdfdfd"}} onClick={handleClick} />
            </Grid>
            <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
         
          >
            <MenuItem onClick={avatarModal}>
            <Person sx={{mr:2}} />
            Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
            <DeleteForever sx={{mr:2}} />
            Delete chat
            </MenuItem>
            <MenuItem onClick={handleClose}>
            <Clear sx={{mr:2}} />
            Clear history
            </MenuItem>
          </Menu>
           </Grid>
       </Container>
    )
}

export default Index
