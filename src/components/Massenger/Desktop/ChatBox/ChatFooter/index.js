import {  Telegram } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import useWidthDimensions from "../../../../../Hook/useWidthDimensions";
import InputEmoji from 'react-input-emoji'
function Index() {

  //------------pick emoji--------------------

  const [ text, setText ] = useState('')
const handleOnEnter = (text) => {
    console.log('enter', text)
    setText('')
  }

  //-------------WidthDimensions------------

  const { width } = useWidthDimensions();
  const [xs, setXs] = useState({ small: 1, big: 11 });
  useEffect(() => {
    if (width <= 1300 && width > 600) {
      setXs({ small: 2, big: 10 });
    } else {
      setXs({ small: 1, big: 11 });
    }
  }, [width]);
  return (
    <Grid item sx={{width:"100%"}}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={xs.big}>
         
          <InputEmoji 
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Your message ..."
          fontSize={22}
          borderRadius={15}
          maxLength={140}
          />
          
          
        </Grid>
        <Grid item xs={xs.small} sx={{ height: "100%" }}>
        
            <Telegram
              sx={{ fontSize: 35, cursor: "pointer" }}
              style={text.length > 0 ? { color: "#FF6B00" } : { color: "gray" }}
              onClick={() => handleOnEnter(text)}
            />
          
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Index;
