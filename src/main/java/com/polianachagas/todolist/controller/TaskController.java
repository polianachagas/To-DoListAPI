package com.polianachagas.todolist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.polianachagas.todolist.model.Task;
import com.polianachagas.todolist.repository.TaskRepository;

@RestController
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
}
