import React, {useEffect, useState} from 'react'
import { api } from '../../api/Api'
import {Navigate} from 'react-router-dom'

export const toggleOption = (option:boolean, func:any) =>
{
    option ? func(false) : func(true)
}


export const PrivateRoute = ({children}:any) => 
{
    const [user, setUser] = useState<boolean | undefined>(undefined)
    useEffect(()=>
    {
        var token = localStorage.getItem('token')
        api.get('/user/validation', {headers:{'Authorization': `Bearer ${token}`}})
        .then((res) => {
            setUser(true)
        })
        .catch((e) => 
        {
            setUser(false)
        })
    }, [])
    do
    {
        if(user !== undefined)
        {
            return user ? children : <Navigate to='/'/>
        }
    }while(user!==undefined)
}