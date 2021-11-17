import { Grid } from '@mui/material'
import React , {useRef , useEffect} from 'react'
import ChatMessage from './ChatText'
import './ChatMessage.css'

const list = [
    {"dir" : "recive" },
    {"dir" : "send"},
    {"dir" : "recive" },
    {"dir" : "send"},
    {"dir" : "recive" },
    {"dir" : "send"},
    {"dir" : "recive" },
    {"dir" : "send"},
    {"dir" : "recive" },
    {"dir" : "send"},
    {"dir" : "recive" },
    {"dir" : "send"},
    {"dir" : "recive" },
    {"dir" : "send"},
    {"dir" : "recive" },
    {"dir" : "send"},
    {"dir" : "recive" },
    {"dir" : "send"}
]
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
        <Grid item xs={10} style={{paddingTop:50 }} >
            <Grid container rowSpacing={2} className="chatMessage-container" >
            {list.map((item , index) => (<ChatMessage dir={item.dir} key={index} />))}
            <div ref={endPage} />
            </Grid>
        </Grid>
    )
}

export default Index
