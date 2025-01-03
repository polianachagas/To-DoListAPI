import React, { use, useEffect, useState } from 'react';
import '../styles/Home.css';
import axios from 'axios';

export default function Home() {

    //show
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks=async()=> {
        try {
            const result = await axios.get("http://localhost:8080/tasks"); 
            setTasks(result.data);
        } catch (error) {
            console.error("Error loading the tasks: ", error);
        }
        
    }

    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const today = `${year}-${month}-${day}`;

    //add
    const [task, addTask] = useState({
        description: "",
        completed: ""
    });

    const{description, completed} = task;

    const onInputChange=(e) => {
        addTask({...task, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/tasks", task);
            loadTasks();
        } catch (error) {
            console.error("Error adding the task: ", error);
        }
    }

    //edit
    /*const onEdit = async(e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/tasks/${id}`, task);
        loadTasks();
    }*/

        const onEdit = async(taskId, updatedTask) => {
            try {
                await axios.put(`http://localhost:8080/tasks/${taskId}`, updatedTask);
                loadTasks();
            } catch (error) {
                console.error("Error updating the task ", error);
            }
        }

    //delete
    const onDelete = async(taskId) => {
        try {
            await axios.delete(`http://localhost:8080/tasks/${taskId}`);
            loadTasks();
        } catch (error) {
            console.error("Error deleting the task: ", error);
        }
    }

    return (
        <div className='container'>

            <div className='header'>
                <img src='/imgs/to-do-list.png'></img>
                <h1>To-Do List</h1>
            </div>
        
            <div className='task-container'> 

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="filter-add">
                    <input
                        placeholder="Type to add or filter"
                        type="text"
                        className="form-control"
                        name="description"
                        value={description}
                        onChange={(e) => onInputChange(e)}
                    />
                    <button type="submit">
                        <img  src="/imgs/add.png" alt="Add Task" />
                    </button>
                </div>
            </form>
            
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Creation Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            tasks.map((task, index) => (
                            <tr>
                                <td className='description'>{task.description}</td>
                                <td className='creation-date'>{task.creationDate}</td>
                                <td className='completed'>{task.completed ? "Completed" : "Pending"}</td> 
                                <td>
                                    <img src='/imgs/check.png'></img>
                                    <button onClick={()=> onEdit(task.id, { ...task, description: "Updated Task" })}><img src='/imgs/edit.png'></img></button>
                                    <button onClick={()=> onDelete(task.id)}><img src='/imgs/delete.png'></img></button>
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
  )
}
