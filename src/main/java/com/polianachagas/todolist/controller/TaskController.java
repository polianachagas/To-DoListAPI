package com.polianachagas.todolist.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.polianachagas.todolist.exception.TaskNotFoundException;
import com.polianachagas.todolist.model.Task;
import com.polianachagas.todolist.model.User;
import com.polianachagas.todolist.repository.TaskRepository;
import com.polianachagas.todolist.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

	@Autowired
	private TaskRepository taskRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/tasks")
	public ResponseEntity<?> newTask(@RequestBody Task newTask, Principal principal) {
	    if (principal == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
	    }

	    String username = principal.getName();
	    User user = userRepository.findByUsername(username);
	    if (user == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
	    }

	    newTask.setUser(user);
	    Task savedTask = taskRepository.save(newTask);
	    return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
	}

	@GetMapping("/tasks")
	public ResponseEntity<List<Task>> getTasks(Principal principal) {
	    String username = principal.getName(); 
	    User user = userRepository.findByUsername(username); 
	    List<Task> tasks = taskRepository.findByUser(user); 
	    return ResponseEntity.ok(tasks);
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
	
	@GetMapping("/user/{username}")
	public ResponseEntity<List<Task>> getTaskByUsername(@PathVariable User user) {
		List<Task> tasks = taskRepository.findByUser(user);
		return ResponseEntity.ok(tasks);
	}
	
}
