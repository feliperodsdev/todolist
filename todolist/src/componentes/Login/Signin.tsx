import React, {useState, useContext} from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './styles.css'; 
import {api} from '../../api/Api';
import {AppContext} from "../../App"
import {toggleOption} from "../utils/utils"
type InputsSignin = {
    username: string, 
    password: string,
};


export const Signin = () => 
{
    const {register, handleSubmit} = useForm<InputsSignin>(); 
    const navigate = useNavigate();
    const {optionUser, setOptionUser} = useContext(AppContext);
    const onSignin = async (data:InputsSignin, e:any) => 
    {
        try
        {
            const config = {
                headers:{
                  "Content-Type": "application/json",
                }
              };
              console.log(data)
            const login = await api.post('/login', data, config);
            if(login.status==200)
            {
                localStorage.setItem('token', login.data.token);
                navigate('/home');
            }
        }
        catch(e:any)
        {
            const msg = e.response.data.msg
            console.log(msg)
        }
    }

    return (
        <div className='main-conteiner'>
            <form className="login-form">
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label' htmlFor="username">Usuário</label>
                    <div className="col-sm-10">
                    <input type="text"  className="form-control" placeholder="Digite seu usuário!" {...register("username")}/>
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label' htmlFor="password">Senha</label>
                    <div className="col-sm-10">
                    <input type="password" placeholder="Digite sua senha!" className="form-control" {...register("password")}/>
                    </div>
                </div>
                <button type="submit" onClick={handleSubmit(onSignin)}className='btn btn-primary'>Entrar</button>
                <button type="button" onClick={() => toggleOption(optionUser, setOptionUser)} className='btn btn-primary'>Cadastrar-se</button>
            </form>
        </div>
    );

};