import React, { useEffect, useState } from "react";
import {useDispatch } from 'react-redux'
import { getConv, getMessage, getReadMsg, getRmvConv, getRmvMsg, handleconvId, updateConv} from '../../Redux'
import socket from '../socket';
import Desktop from './Desktop/Desktop'
import Mobile from './Mobile/Mobile'
import useMediaQuery from "../../Hook/useMediaQuery";

function Massenger() {
  const dispatch = useDispatch()
  const id =  localStorage.getItem('userId')


  useEffect(()=>{
    if(id === null){
      localStorage.clear()
      window.location.reload()
    }else{
      socket.emit('addUser' , id);
      socket.connect()
      socket.on('getMessage' , (msg)=>{
        dispatch(getMessage(msg))
        // console.log(msg)
      });
      socket.on('getConversation' , c =>{
       dispatch(getConv(c))
       if(c.length > 0){
         c.forEach(conv =>{
           dispatch(handleconvId({conversationId:conv.conversationId}))
           dispatch(updateConv())
         })
       }else{
         dispatch(getRmvConv(true))
       }
      }) 
      socket.on('getRmvMsg' , () =>{
        dispatch(getRmvMsg())
      })
      socket.on('getReadMsg' , () =>{
       dispatch(getReadMsg())
      })
    }
  },[id,dispatch])

 
  // const accountUser =  useSelector(state => state.userState.user)
  const desktop = useMediaQuery("(min-width: 700px)");
  const [page, setPage] = useState("main");
  useEffect(() => {
    const resPage =() => {
      desktop ? setPage("main") : setPage("mobile");
    };
    resPage();
  }, [desktop ]);

    if (page === "main") {
      return <Desktop />;
    } else {
      return <Mobile />;
    }
  
}

export default Massenger;