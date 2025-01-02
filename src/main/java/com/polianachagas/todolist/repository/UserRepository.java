package com.polianachagas.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.polianachagas.todolist.Model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
