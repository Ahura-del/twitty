import { Grid, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState , useRef } from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { format } from "timeago.js";

function ChatText(props) {
  const sender = localStorage.getItem('userId')
  const pText = useRef()

     //-----------menu----------------
    const [copyText , setCopyText] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setCopyText(pText.current.textContent);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 

    return (
        <>
        <Grid container  
        direction="row" sx={{width:"100%"}}
        justifyContent={props.data.sender === sender ? "flex-end" : "flex-start"}>

        <Grid item onContextMenu={(e)=>handleClick(e)} className='text' sx={{my:1 , maxWidth:"75%" , px:2 , py:1 , borderRadius:10}} 
        style={props.data.sender=== sender ? {background:"#1d1e21"} : {background:"#FF6B00"}  } >
            <Typography sx={{fontSize:14 , color:"#fdfdfd"}} ref={pText} >
                {props.data.text}
            </Typography>
            <small style={props.data.sender=== sender ? {color:"#888"} : {color:"#222"} }>
            {format(props.data.createdAt)}
            </small>
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

export default ChatText
