import { EmojiEmotions, Telegram } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ChatFooter.css";
import useWidthDimensions from "../../../../../Hook/useWidthDimensions";

function Index() {

    //----------chat input -----------
    const [chat , setChat] = useState('')


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
    <Grid item className="chat-footer">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={xs.big}>
          <input
            type="text"
            name="chat-footer-input"
            id="chat-footer-input"
            autoComplete="off"
            autoFocus
            value={chat}
            onChange={e=>setChat(e.target.value)}
            placeholder="Your message ..."
          />
        </Grid>
        <Grid item xs={xs.small} sx={{ height: "100%" }}>
          <Grid container justifyContent="space-around">
            <EmojiEmotions
              sx={{ fontSize: 35, color: "gray", cursor: "pointer" }}
            />
            <Telegram sx={{ fontSize: 35, cursor: "pointer" }} style={chat.length>0 ? {color:"#FF6B00"} : {color:"gray"} } />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Index;
