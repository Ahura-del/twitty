import { Container, Grid, Typography } from "@mui/material";
import React, { useRef, useEffect } from "react";
import ChatText from "./ChatText";
import "./ChatMessage.css";

function Index({ messages }) {
  const endPage = useRef();

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
    <Container maxWidth="md">
     {messages?.length < 1 ? (<Grid container style={{width:"100%"  , display:"flex" , textAlign:"center" , justifyContent:"center"}} >
       <Typography sx={{color:"gray" , textAlign:"center"}} variant="h3" >No message!</Typography>
     </Grid>) : (
      <Grid container rowSpacing={2}>
        {messages?.map((item, index) => (
          <ChatText
            text={item.text}
            sender={item.sender}
            time={item.createdAt}
            key={index}
          />
        ))}
        <div ref={endPage} />
      </Grid>
     )}
    </Container>
  );
}

export default Index;
