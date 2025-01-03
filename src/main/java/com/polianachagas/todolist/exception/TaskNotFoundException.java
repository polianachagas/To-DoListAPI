package com.polianachagas.todolist.exception;

public class TaskNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public TaskNotFoundException(Long id) {
		super("Could not find the task with id " + id);
	}

}
