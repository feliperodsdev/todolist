import React, {useContext} from 'react'; 
import './styles.css';
import { TasksContext } from './Tasks';

type TaskModel = {
    title: string, 
    content: string, 
    doat: Date, 
    done: boolean,
    _id: string, 
    indice: number
}

export const Task = (props:TaskModel) => 
{
    const titleAndDate = props.title + ' <-> ' + props.doat

    const {doTodo, deleteTodo} = useContext(TasksContext);

    return(
        <li className={props.done ? 'done todo' : 'todo'}>
            <div className='todo_text'>
                <p className="todo_text_font">{titleAndDate}</p>
                <p className="todo_text_desc">{props.content}</p>
            </div>
            <section>
                <button className='btn btn-dark btn_p' onClick={() => doTodo(props._id, props.indice)} id='concluir-tarefa'>
                    Concluir Tarefa
                </button>
                <button className='btn btn-primary btn_p' onClick={() => deleteTodo(props._id, props.indice)} id='excluir-tarefa'>
                    Excluir Tarefa
                </button>
            </section>
        </li>
    );
}