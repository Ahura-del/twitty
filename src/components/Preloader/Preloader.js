import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addUser, getAllUsers, getConversation } from '../../Redux';
import Loading from '../Loading/Loading';
import Massenger from '../Massenger/Massenger';
function Preloader() {
    const dispatch =  useDispatch()
    const updateConv = useSelector(state => state.conversationState.update)

    const [loading , setLoading] = useState(false)

    const logout = ()=>{
        localStorage.clear()
        window.location.reload()
    }
    useEffect(()=>{
        const id = localStorage.getItem('userId')
        const token = localStorage.getItem('token');
        let users = [];
        const getAllData = async ()=>{
            setLoading(true)
            await axios.get(`/user/${id}` , {headers:{'authorization': `Bearer ${token}`}})
            .then(res =>{
                if(res.status === 200){
                    dispatch(addUser(res.data))
                }
            }).catch((err) =>{
                if(err.response){
                    logout()
                }
            })
    
           await axios.get(`/conversation/${id}` , {headers:{'authorization': `Bearer ${token}`}})
           .then(res=>{
               if(res.status === 200){
                   dispatch(getConversation(res.data))
               }
           }).catch((err)=>{
               if(err.response){
                   logout()
               }
           })

           await axios.get('/user/allUsers' ,  {headers:{'authorization': `Bearer ${token}`}})
           .then((res)=>{
            if(res.status === 200){
                res.data.forEach(user =>{
                    if(user._id !== id ){
                      users.push(user)
                      dispatch(getAllUsers(users))
                    }
                  })
            }
           }).catch((err)=>{
            if(err.response){
                logout()
            }
           })
           
            
        }
        if(token && id){
            getAllData().then(()=>setLoading(false))
        }else{
            logout()
        }
    },[dispatch ])

   
    useEffect(()=>{
        const id = localStorage.getItem('userId')
    const token = localStorage.getItem('token');
        const getConv = async ()=>{
            await axios.get(`/conversation/${id}` , {headers:{'authorization': `Bearer ${token}`}})
            .then(res=>{
                if(res.status === 200){
                    dispatch(getConversation(res.data))
                }
            }).catch((err)=>{
                if(err.response){
                    logout()
                }
            })
        } 
        getConv()
    },[dispatch,updateConv])

        
        if(loading){
            return(<Loading />)
        }else{
            return(
      <Suspense fallback={Loading}>
        <Massenger />
      </Suspense>
      )
    
}
}

export default Preloader;
