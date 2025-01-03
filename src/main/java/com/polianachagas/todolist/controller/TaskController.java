package com.polianachagas.todolist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.polianachagas.todolist.exception.TaskNotFoundException;
import com.polianachagas.todolist.model.Task;
import com.polianachagas.todolist.repository.TaskRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

	@Autowired
	private TaskRepository taskRepository;
	
	@PostMapping("/tasks")
	Task newTask(@RequestBody Task newTask) {
		return taskRepository.save(newTask);
	}
	
	@GetMapping("/tasks")
	List<Task> getAllTasks() {
		return taskRepository.findAll();
	}
	
	@PutMapping("/tasks/{id}")
	Task updateTask(@RequestBody Task newTask, @PathVariable Long id) {
		return taskRepository.findById(id).map(task -> {
					task.setDescription(newTask.getDescription());
					task.setCreationDate(newTask.getCreationDate());
					task.setCompleted(newTask.getCompleted());
					return taskRepository.save(task);
				}).orElseThrow(() -> new TaskNotFoundException(id));
	}
	
	@DeleteMapping("/tasks/{id}")
	String deleteTask(@PathVariable Long id) {
		if(!taskRepository.existsById(id)) {
			throw new TaskNotFoundException(id);
		} else {
			taskRepository.deleteById(id);
			return "Task has been deleted";
		}
	}
	
}
