import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from 'react-redux'
import {getUser} from '../../Redux'
import Desktop from './Desktop'
import Mobile from './Mobile'
import useMediaQuery from "../../Hook/useMediaQuery";
import { CircularProgress } from "@mui/material";
function Index() {
  const dispatch = useDispatch()
  const [user , setUser] = useState([])
  useEffect(()=>{
      const id =  localStorage.getItem('userId')
      const token =  localStorage.getItem('token')
      dispatch(getUser({id , token}))
  },[dispatch])
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
    return <CircularProgress />
  }else{ 
    if (page === "main") {
      return <Desktop />;
    } else {
      return <Mobile />;
    }
  }
}

export default Index;