import { Container, Grid } from '@mui/material'
import React , {useRef , useEffect} from 'react'
import ChatText from './ChatText'
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
        <Container >
            <Grid container rowSpacing={2}  >
            {list.map((item , index) => (<ChatText dir={item.dir} key={index} />))}
            <div ref={endPage} />
            </Grid>
        </Container>
    )
}

export default Index
