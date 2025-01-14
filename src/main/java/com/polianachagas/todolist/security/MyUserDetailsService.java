package com.polianachagas.todolist.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.polianachagas.todolist.model.User;
import com.polianachagas.todolist.repository.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;
	
	public MyUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) {
		User user = userRepository.findByUsername(username);
		
		if (user == null) {
			throw new UsernameNotFoundException("This user doesn't exist!");
		}
		
		return new UserPrincipal(user);
	}
}
