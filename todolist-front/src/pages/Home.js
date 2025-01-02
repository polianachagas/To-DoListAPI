import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import axios from 'axios';
import '../imgs/check.png';


export default function Home() {

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

    return (
        <div className='container'>

            <div className='header'>
                <img src='/imgs/to-do-list.png'></img>
                <h1>To-Do List</h1>
            </div>
            
            <div className='task-container'> 

                <div className='filter-add'>
                    <input placeholder="Type to add or filter"></input>
                    <img src='/imgs/add.png'></img>
                </div> 
            
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
                                    <img src='/imgs/edit.png'></img>
                                    <img src='/imgs/delete.png'></img>
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
