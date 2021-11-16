import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'

function Index(props) {
    return (
        <>
        <ListItem alignItems="center" className="list-item">
                    <ListItemAvatar>
                      <Avatar
                        alt="search item"
                        src={props.pic}
                        sx={{ width: 56, height: 56 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className="list-text-area"
                      style={{ color: "black", marginLeft: 20 }}
                      primary={props.name}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            style={{
                              color: "gray",
                              marginTop: "8px",
                              display: "inline-block",
                            }}
                          >
                            {props.bio}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider
                    style={{
                      background: "gray",
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                    className="divider"
                  />
        </>
    )
}

export default Index
