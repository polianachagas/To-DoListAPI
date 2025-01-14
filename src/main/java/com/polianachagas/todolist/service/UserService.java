package com.polianachagas.todolist.service;

import java.util.List;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.polianachagas.todolist.model.User;
import com.polianachagas.todolist.repository.UserRepository;

@Service
public class UserService {
	
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	private final UserRepository userRepository;
	
	public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, BCryptPasswordEncoder bCryptPasswordEncoder1) {
		this.userRepository = userRepository;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}
	
	public List<User> getUsers() {
		return userRepository.findAll();
	}
	
	public User getUser(Long id) {
		return userRepository.findById(id).orElse(null);
	}
	
	public User addUser(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}
	
	public boolean authenticate(String username, String password) {
		User user = userRepository.findByUsername(username);
		
		if (!user.getUsername().equals(username)) {
			throw new UsernameNotFoundException("User does not exist!");
		}
		
		if (!bCryptPasswordEncoder.matches(password, user.getPassword())) {
		    throw new BadCredentialsException("The password is incorrect!");
		}

		
		return true;
	}

}
