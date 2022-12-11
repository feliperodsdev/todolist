import React, {useEffect, useContext, createContext} from 'react'; 
import { api } from '../../api/Api';
import { MainContext } from './Main';
import { Task } from './Task'; 

export const TasksContext = createContext<any>([])

export const Tasks = () => 
{
    const {organizaList, listTasks} = useContext(MainContext)

    const deleteTodo = async (_id:string, indice:number) => 
    {
        var token = localStorage.getItem('token')
        try
        {
            const config = {
                headers: 
                {
                    'Authorization': `Bearer ${token}`
                }
            }
            var reqDel = await api.delete(`/task/operations/${_id}`, config)
            console.log(reqDel)
            if(reqDel.status == 200)
            {
                const updatedList = listTasks
                updatedList.splice(indice, 1)
                organizaList([...updatedList])
            }
        }
        catch(e)
        {
            console.log(e)
        }
    }

    const doTodo = async (_id:string, indice:number) => 
    {
        var token = localStorage.getItem('token')
        try
        {
            const config = 
            {
                headers: 
                {
                    'Authorization': `Bearer ${token}`
                }
            }
            var reqUp = await api.put('/task/operations', {_id:_id}, config)
            if(reqUp.status == 200)
            {
                const updatedList = listTasks
                var task = updatedList[indice]
                if(task.done === true) task.done = false 
                else task.done = true
                updatedList.splice(indice, 1)
                organizaList([...updatedList, task])
            }
        }
        catch(e)
        {
            console.log(e)
        }
    }

    const showTasks = async () => 
    {
        try
        {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Authorization": "Bearer " + token, 
                }
            }            
            const taskList = await api.get('task/operations', config)
            if (taskList.status == 200)
            {
                const taskListMod = taskList.data
                organizaList(taskListMod)
            }
        }
        catch(e)
        {
            console.log(e)
        }   
    }

    useEffect(() => {
        showTasks()
    }, [])

    return(

            <div className="main_todo">
                <ul className="todo_list">
                    {listTasks?.map((todo:any, indice:number) => 
                    {
                        const task = {
                            title: todo.title, 
                            content: todo.content, 
                            doat: todo.doat, 
                            done: todo.done, 
                            _id: todo._id,
                            indice: indice
                        }
                        return (
                            <TasksContext.Provider value={{doTodo, deleteTodo}}>
                            <Task {...task}/>
                            </TasksContext.Provider>
                        );
                    })}
                </ul>
            </div>
    );
}