import { Sidebar } from "./Sidebar";
import { Tasks } from "./Tasks";
import './styles.css'
import {createContext, useContext, useEffect, useState} from 'react'
import { AppContext } from "../../App";

export const MainContext = createContext<any>(undefined);

type TaskModel = {
    title: string, 
    content: string, 
    doat: Date, 
    done: boolean,
    _id: string
}

export const Main = () => 
{

    const [listTasks, setListTasks] = useState<TaskModel[]>([]); 
    const {showNotify} = useContext(AppContext)
    const organizaList = (tasks:TaskModel[]) => 
    {
        const taskOrg = []
        const doneTask = []
        for(let i in tasks)
        {
            if(tasks[i].done == false)
            {
                taskOrg.push(tasks[i])
            } else doneTask.push(tasks[i])
        }
        setListTasks([...taskOrg, ...doneTask])
    }

    useEffect(() => 
    {
        organizaList(listTasks)
    }, [])

    return (
        <MainContext.Provider value={{organizaList, listTasks, showNotify}}>
        <div>
            <section className="sidebar">
                <Sidebar/> 
            </section>
            <div className="main">
                <Tasks/>
            </div>
        </div>
        </MainContext.Provider>
    ); 
}