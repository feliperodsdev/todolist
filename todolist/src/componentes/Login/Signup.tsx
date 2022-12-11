import React, {useContext} from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {api} from '../../api/Api';
import {toggleOption} from "../utils/utils";
import {AppContext} from "../../App"

type InputsSignup = {
    user: string, 
    name: string, 
    password: string, 
    passwordConfirm: string, 
}

export const Signup = () => 
{
    const {optionUser, setOptionUser} = useContext(AppContext); 
    const {register, handleSubmit} = useForm<InputsSignup>(); 
    const navigate = useNavigate(); 
    const onSignup = async(data:InputsSignup) => 
    {
        try 
        {
            const config = 
            {
                headers: {
                    "Content-Type":"application/json", 
                }
            }; 
            const registrarUsuario = await api.post('/user/create', data, config)
            if(registrarUsuario.status == 200)
            {
                toggleOption(optionUser, setOptionUser)
            }
        }
        catch(e)
        {
            console.log(e)
        }
    }
    return (
        <div className='main-conteiner'>
            <form className="login-form">
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label' htmlFor="username">Usuário</label>
                    <div className="col-sm-10">
                    <input type="text"  className="form-control" placeholder="Digite seu usuário!" {...register("user")}/>
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label' htmlFor="name">Nome</label>
                    <div className="col-sm-10">
                    <input type="text" placeholder="Digite sua senha!" className="form-control" {...register("name")}/>
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label'  htmlFor="password">Senha</label>
                    <div className="col-sm-10">
                    <input type="password" placeholder="Digite sua senha!" className="form-control" {...register("password")}/>
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label' htmlFor="passwordConfirm">Confirme a senha</label>
                    <div className="col-sm-10">
                    <input type="password" placeholder="Confirme sua senha!" className="form-control" {...register("passwordConfirm")}/>
                    </div>
                </div>
                <button type="submit" onClick={() => toggleOption(optionUser, setOptionUser)} className='btn btn-primary'>Voltar</button>
                <button type="button" onClick={handleSubmit(onSignup)} className='btn btn-primary'>Cadastrar-se</button>
            </form>
        </div>
    );
}