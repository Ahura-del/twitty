import { Grid, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard";
function Index(props) {


     //-----------menu----------------
    const [copyText , setCopyText] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setCopyText(event.target.textContent);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 

    return (
        <>
        <Grid container  onContextMenu={(e)=>handleClick(e)} direction="row" sx={{width:"100%"}} justifyContent={props.dir === "recive" ? "flex-start" : "flex-end"}>

        <Grid item  sx={{my:1 , maxWidth:"75%" , px:2 , py:1 , borderRadius:10}} style={props.dir==="recive" ? {background:"#FF6B00"} : {background:"#1d1e21"}} >
            <Typography sx={{fontSize:14 , color:"#fdfdfd"}}>
                Lorem ipsum, hi this is test text for mobile screen
            </Typography>
        </Grid>
        </Grid>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
         
          >
            <MenuItem onClick={()=> setAnchorEl(null)}>
            <CopyToClipboard text={copyText}>
            <Typography>Copy</Typography>
            </CopyToClipboard>
            </MenuItem>
          </Menu>
        </>
    )
}

export default Index
