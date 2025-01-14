package com.polianachagas.todolist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.polianachagas.todolist.model.Task;
import com.polianachagas.todolist.model.User;

public interface TaskRepository extends JpaRepository<Task, Long>{
	List<Task> findByUser(User user);
}
