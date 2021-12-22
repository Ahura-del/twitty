import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import {useDispatch, useSelector } from 'react-redux'
import {getUser} from '../../Redux/userSlice'
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
=======
import Desktop from './Desktop'
import Mobile from './Mobile'
import useMediaQuery from "../../Hook/useMediaQuery";
function Index() {
  const desktop = useMediaQuery("(min-width: 700px)");
  const [page, setPage] = useState("main");
  useEffect(() => {
    const resPage = () => {
      desktop ? setPage("main") : setPage("mobile");
    };
    resPage();
  }, [desktop]);
  if (page === "main") {
    return <Desktop />;
  } else {
    return <Mobile />;
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
  }
}

export default Index;
