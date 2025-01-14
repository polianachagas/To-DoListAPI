package com.polianachagas.todolist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.polianachagas.todolist.model.LoginRequest;
import com.polianachagas.todolist.model.User;
import com.polianachagas.todolist.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	private UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping("/users")
	public ResponseEntity<User> newUser(@RequestBody() User user) {
		User newUser = userService.addUser(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
	}
	
	@GetMapping("/users")
	List<User> getAllUsers() {
		return userService.getUsers();
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
		try {
			boolean isAuthenticated = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
			
			if (isAuthenticated) {
				session.setAttribute("user", loginRequest.getUsername());
				return ResponseEntity.ok("Login was successful!");
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unknown error occurred");
		}
	}
}
