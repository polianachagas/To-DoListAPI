package com.polianachagas.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.polianachagas.todolist.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{

}
