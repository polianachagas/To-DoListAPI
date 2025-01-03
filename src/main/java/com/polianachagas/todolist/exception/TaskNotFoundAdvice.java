package com.polianachagas.todolist.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class TaskNotFoundAdvice {

	@ResponseBody
	@ExceptionHandler(TaskNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public Map<String, String> exceptionHandler(TaskNotFoundException exception) {
		Map<String, String> errorMap = new HashMap<>();
		errorMap.put("Error message: ", exception.getMessage());
		
		return errorMap;
	}
}
