import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContext } from './Main';
import {useForm} from 'react-hook-form';
import { api } from '../../api/Api';

type Task = {
    title: string, 
    content: string, 
    doat: Date, 
    done: Boolean, 
    _id: string, 
}

export const Sidebar = () => 
{
    const navigate = useNavigate(); 
    const {register, handleSubmit} = useForm<Task>(); 
    const {listTasks, organizaList, showNotify} = useContext(MainContext)
    const doLogout = () => 
    {
        navigate('/')
    }

    const createTask = async (task:Task) => 
    {   
        try
        {
            var taskToBeAdd = task 
            taskToBeAdd.done = false 
            var token = localStorage.getItem('token')
            const createTodo = await api.post('/task/operations', taskToBeAdd, {headers: {'Authorization': `Bearer ${token}`}})
            if(createTodo.status==200)
            {
                taskToBeAdd._id = createTodo.data._id
                const task = [...listTasks, taskToBeAdd]
                organizaList(task)
                showNotify('Tarefa criada!', 'success')
            }
        }
        catch(e:any)
        {
            showNotify('Preencha todos os campos!', 'error')
        }
    }

    return(
        <div className="sidebar_create__todo">
            <form  className="sidebar_input">
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm" >Tarefa</span>
                    <input {...register("title")} type="text"  className="form-control"  id="createtodo" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder='"Comprar abacate.."'/>
                </div>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Data</span>
                    <input type="date" {...register("doat")}  className="form-control"  required id="currentDate" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
                </div>
                <div className="form-floating">
                    <label >Descrição da tarefa</label>
                    <textarea rows={5} cols={33}  {...register("content")} id="floatingTextarea" className="form-control style-add"  placeholder="Leave a comment here" />
                  </div>
                <button type="submit" onClick={handleSubmit(createTask)} id='button_todo' className="btn btn-dark createtodo_button">Criar tarefa</button>
                <button type="button" id='logout_button' onClick={() => doLogout()} className="btn btn-dark createtodo_button">Sair</button>
            </form>
        </div>
    );
}