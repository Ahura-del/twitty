import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from 'react-redux'
import { getConversation, getUser} from '../../Redux'
import Desktop from './Desktop'
import Mobile from './Mobile'
import Loading from '../Loading'
import useMediaQuery from "../../Hook/useMediaQuery";
// import axios from "axios";

function Index() {
  const dispatch = useDispatch()
  const [user , setUser] = useState([])
  const id =  localStorage.getItem('userId')
  const token =  localStorage.getItem('token')
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
      return <Desktop />;
    } else {
      return <Mobile />;
    }
  }
}

export default Index;