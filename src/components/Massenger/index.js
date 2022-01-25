import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from 'react-redux'
import { getConversation, getUser} from '../../Redux'
import socket from '../socket';
import Desktop from './Desktop'
import Mobile from './Mobile'
import Loading from '../Loading'
import useMediaQuery from "../../Hook/useMediaQuery";

function Index() {
  const dispatch = useDispatch()
  const [user , setUser] = useState([])
  const [msg , setMsg] = useState([])
  const [status , setStatus] = useState(false)
  const [readMsg , setReadMsg] = useState(false)
  const [conversation , setConversation] = useState([])
  const id =  localStorage.getItem('userId')
  const token =  localStorage.getItem('token')

  useEffect(()=>{
    if(id === null){
      localStorage.clear()
      window.location.reload()
    }else{
      // socket.auth = {id}
      socket.emit('addUser' , id);
      socket.connect()
      socket.on('getMessage' , (msg)=>{
        setMsg(msg)
      });
      socket.on('getConversation' , c =>{
        setConversation(c)
      }) 
      socket.on('getRmvMsg' , status =>{
        setStatus(status)
      })
      socket.on('getReadMsg' , read =>{
        setReadMsg(read)
      })
    }
  },[id])
  useEffect(()=>{
      dispatch(getUser({id , token}))
      dispatch(getConversation({ myUserId:id, token }))
      
  },[dispatch,id,token])
 
  const accountUser =  useSelector(state => state.userState.user)
  const desktop = useMediaQuery("(min-width: 700px)");
  const [page, setPage] = useState("main");
  useEffect(() => {
    const resPage =async () => {
      const fetchUser = await accountUser
      setUser(fetchUser)
      desktop ? setPage("main") : setPage("mobile");
    };
    resPage();
  }, [accountUser,desktop ]);







  if(user.name === undefined){
    return <Loading />
  }else{ 
    if (page === "main") {
      return <Desktop message={msg} conv={conversation} rmvMsg={status} readMsg={readMsg} />;
    } else {
      return <Mobile conv={conversation} />;
    }
  }
}

export default Index;