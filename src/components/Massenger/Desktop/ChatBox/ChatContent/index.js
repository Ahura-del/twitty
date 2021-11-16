import { Grid } from '@mui/material'
import React from 'react'
import ChatMessage from './ChatText'
import './ChatMessage.css'

function Index() {
    return (
        <Grid item xs={6} style={{paddingTop:50 }}>
            <Grid container rowSpacing={2} className="chatMessage-container">
            <ChatMessage dir="recive" />
            <ChatMessage dir="send" />
            <ChatMessage dir="recive" />
            <ChatMessage dir="send" />
            <ChatMessage dir="recive" />
            <ChatMessage dir="send" />
            <ChatMessage dir="recive" />
            <ChatMessage dir="send" />
            </Grid>
        </Grid>
    )
}

export default Index
