import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
function ChatText(props) {
  const [dir, setDir] = useState("");
  const id = localStorage.getItem("userId");
  useEffect(() => {
    props.sender === id ? setDir("send") : setDir("recive");
  }, [props , id]);

  return (
    <Grid item xs={12}>
      <Grid
        container
        justifyContent={dir === "recive" ? "flex-start" : "flex-end"}
      >
        <div
          className="chat-message"
          style={
            dir === "recive"
              ? { background: "#e86d1b" }
              : { background: "#111" }
          }
        >
          <Typography style={{ color: "white", fontSize: 16 }}>
            {props.text}
          </Typography>
          <span
            style={
              dir === "recive"
                ? {
                    display: "inline-block",
                    width: "100%",
                    color: "#333",
                    fontSize: 13,
                    textAlign: "left",
                  }
                : {
                    display: "inline-block",
                    width: "100%",
                    color: "#ddd",
                    fontSize: 13,
                    textAlign: "right",
                  }
            }
          >
            {format(props.time)}
          </span>
        </div>
      </Grid>
    </Grid>
  );
}

export default ChatText;
