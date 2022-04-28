import React, { Suspense, useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addUser, getAllUsers, getConversation } from '../../Redux';
import API from '../config/API';
import Loading from '../Loading/Loading';
import Massenger from '../Massenger/Massenger';
function Preloader() {
    const dispatch =  useDispatch()
    const updateConv = useSelector(state => state.conversationState.update)
    
    const [loading , setLoading] = useState(false)
    
    const logout = ()=>{
        localStorage.clear()
        caches.clear()


        window.location.reload()
    }
    


    
    useEffect(()=>{
 
        const id = localStorage.getItem('userId')
        const token = localStorage.getItem('token');
        let users = [];
        const getAllData = async ()=>{
            setLoading(true)
            await API({method:'get' , url:`${window.api}/user/${id}`})
            .then(res =>{
                if(res.status === 200){
                    dispatch(addUser(res.data))
                }
            }).catch((err) =>{
                if(err.response){
                    logout()
                }
            })
            await API({method:'get' , url:`${window.api}/conversation/${id}`})
           .then(res=>{
               if(res.status === 200){
                   dispatch(getConversation(res.data))
               }
           }).catch((err)=>{
               if(err.response){
                 logout()
               }
           })
           await API({method:'get' , url:`${window.api}/user/allUsers`})
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
        const getConv = async ()=>{
            await API({method:'get' , url:`${window.api}/conversation/${id}`})
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
