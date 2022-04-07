import { Container, Grid, Typography } from "@mui/material";
import React, { useRef, useEffect } from "react";
import ChatText from "./ChatText/ChatText";
import "./ChatMessage.css";

function ChatMessage({ messages }) {
  const endPage = useRef();
  // console.log(messages)

  useEffect(() => {
    if (endPage.current) {
      endPage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  });
  return (
    <Container maxWidth="md" sx={{ height: "100%" }}>
      {messages?.length < 1 ? (
        <Grid
          container
          style={{
            width: "100%",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ color: "gray", textAlign: "center" }} variant="h3">
            No message!
          </Typography>
        </Grid>
      ) : (
        <Grid
          container
          rowSpacing={2}
          sx={messages === "offline" && { height: "100%" }}
        >
          {messages === "offline" ? (
            <Grid container sx={{ width: "100%", height: "100%" }}>
              <Grid
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  textAlign: "center",
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  sx={{ flexBasis: "100%", color: "#FA6D38", fontSize: "24px" }}
                >
                  You're Offline!
                </Typography>
                <Typography
                  sx={{ flexBasis: "100%", color: "#FA6D38", fontSize: "24px" }}
                >
                  Please connect to the network
                </Typography>
              </Grid>
            </Grid>
          ) : (
            messages?.map((item, index) => (
              <ChatText
                text={item.text}
                sender={item.sender}
                time={item.createdAt}
                key={index}
              />
            ))
          )}
          <div ref={endPage} />
        </Grid>
      )}
    </Container>
  );
}

export default ChatMessage;
