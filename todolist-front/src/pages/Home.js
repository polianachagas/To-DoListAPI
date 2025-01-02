import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import axios from 'axios';

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
            <div className='task-container'> 
                
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
                        </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>
        </div>
  )
}
