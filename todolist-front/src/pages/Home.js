import React, { use, useEffect, useState } from 'react';
import '../styles/Home.css';
import axios from 'axios';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { getAuthCredentials } from '../utils/Auth';

export default function Home() {

    //show
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const result = await axiosInstance.get("http://localhost:8080/tasks", {
                withCredentials: true, 
            });
            console.log("Tasks fetched: ", result.data);
            setTasks(result.data); 
        } catch (error) {
            console.error("Error loading the tasks: ", error);
        }
    };
    

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
        if (task.description == "") {
            alert("Task can't be empty!");
            return;
        } 
        try {
            await axiosInstance.post("http://localhost:8080/tasks", task, {
                withCredentials: true,
            });
            loadTasks();
            task.description = "";
        } catch (error) {
            console.error("Error adding the task: ", error);
        }
    }

    //edit
    const [editingTaskId, setEditingTaskID] = useState(null);
    const [editingDescription, setEditingDescription] = useState("");

    const onEditClick = (task) => {
        setEditingTaskID(task.id);
        setEditingDescription(task.description);
    }

    console.log("Username: ", getAuthCredentials());

    const onEdit = async(taskId, updatedTask) => {
        try {
            await axiosInstance.put(`http://localhost:8080/tasks/${taskId}`, {
                description: editingDescription,
            });
            setEditingTaskID(null);
            loadTasks();
        } catch (error) {
            console.error("Error updating the task ", error);
        }
    }

    //delete
    const onDelete = async(taskId) => {
        try {
            await axiosInstance.delete(`http://localhost:8080/tasks/${taskId}`);
            loadTasks();
        } catch (error) {
            console.error("Error deleting the task: ", error);
        }
    }

    //complete
    const onCompleted = (taskId) => {
        const updatedTasks = tasks.map((task) =>
        task.id === taskId ? {...task, completed: !task.completed} : task);
        setTasks(updatedTasks);
    }

    return (
        <div className='container-home'>
            <div className='content'>

                <div className='header'>
                    <img src='/imgs/to-do-list.png'></img>
                    <Link className='title' to={"/"}>To-Do List</Link>
                </div>

                <div className='task-container'>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="add">
                            <input
                                placeholder="Type to add or filter"
                                type="text"
                                className="form-control"
                                name="description"
                                value={description}
                                onChange={(e) => onInputChange(e)} />
                            <button type="submit">
                                <img src="/imgs/add.png" alt="Add Task" />
                            </button>
                        </div>
                    </form>

                    <table>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Creation Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={task.id} className={task.completed ? "completed" : "pending"}>
                                    <td className="description">
                                        {editingTaskId === task.id ? (
                                            <input
                                                type="text"
                                                value={editingDescription}
                                                onChange={(e) => setEditingDescription(e.target.value)} />
                                        ) : (
                                            task.description
                                        )}
                                    </td>
                                    <td className='creation-date'>{task.creationDate}</td>

                                    <td>
                                        {editingTaskId === task.id ? (
                                            <button onClick={() => onEdit(task.id)}><img src='/imgs/thumbs-up.png'></img></button>
                                        ) : (
                                            <button onClick={() => onEditClick(task)}>
                                                <img src="/imgs/edit.png" alt="Edit" />
                                            </button>
                                        )}
                                        <button onClick={() => onCompleted(task.id)}><img src='/imgs/check.png'></img></button>
                                        <button onClick={() => onDelete(task.id)}><img src='/imgs/delete.png'></img></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <footer>
                <a href="https://www.flaticon.com/free-icons/to-do-list" title="to do list icons">To do list icons created by Freepik - Flaticon</a>
            </footer>
        </div>
        
  )
}
