package com.polianachagas.todolist.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.polianachagas.todolist.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByUsername(String username);
}
