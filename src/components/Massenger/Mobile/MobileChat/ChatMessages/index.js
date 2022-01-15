import { Container } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import ChatText from './ChatText'
function Index() {
    const endPage = useRef()

    useEffect(()=>{
        if (endPage.current) {
            endPage.current.scrollIntoView(
              {
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
              })
            }
    })
    return (
       <Container  sx={{height:"100%"}}>
           <ChatText dir="recive"/>
        <ChatText dir="send"/>
        <ChatText dir="send"/>
        <ChatText dir="recive"/>
        <ChatText dir="recive"/>
        <ChatText dir="send"/>
        <ChatText dir="send"/>
        <ChatText dir="recive"/>
        <ChatText dir="recive"/>
        <ChatText dir="send"/>
        <ChatText dir="send"/>
        <ChatText dir="recive"/>
        <ChatText dir="recive"/>
        <ChatText dir="send"/>
        <ChatText dir="send"/>
        <ChatText dir="recive"/>
        <ChatText dir="recive"/>
        <ChatText dir="send"/>
        <ChatText dir="send"/>
        <ChatText dir="recive"/>
        <div ref={endPage} />
        </Container>
      
    )
}

export default Index
