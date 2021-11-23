import { Divider, Grid, Skeleton, Stack , Container } from '@mui/material'
import React from 'react'
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import pic from '../../../../assets/userAvatar.png'
import { useHistory } from 'react-router-dom';
function Index(props) {
  const history = useHistory()
    return (
        <Grid container >
        <Container>

            {props.active ? (
        <ChatItem
          avatar={pic}
          alt={"Reactjs"}
          title="Facebook"
          subtitle="What are you doing?"
          date={new Date()}
          unread={2}
          onClick={()=>history.push('/chat')}
          avatarFlexible={true}
          statusText=""
          statusColor="green"
        />
      ) : (
        <Stack spacing={1}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item >
            <Grid container alignItems="center">
                <Grid item sx={{ mr: 2 }}>
                <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ bgcolor: "grey.500" }}
              />
                </Grid>
                <Grid item>
                <Skeleton
                variant="text"
                sx={{ bgcolor: "grey.500" }}
              />
              <Skeleton
                variant="text"
                width={200}
                height={40}
                sx={{ bgcolor: "grey.500" }}
              />
                </Grid>
            </Grid>
              
            </Grid>
            <Grid item >
              <Skeleton
                variant="text"
                width={40}
                height={20}
                sx={{ bgcolor: "grey.500" , mb:5}}
              />
            
            </Grid>
          </Grid>
        </Stack>
      )}
      <Divider
        sx={{ background: "gray", marginTop: 2, marginBottom: 2 }}

      />
        </Container>
        </Grid>
    )
}

export default Index
