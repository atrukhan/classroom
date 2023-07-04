package com.example.springboot.dao;

import com.example.springboot.models.Status;
import com.example.springboot.models.Student;

import java.util.List;

public class MessageDao {
    private StudentDao sender;
    private String message;

    private Status status;

    private List<StudentDao> students;
    public MessageDao() {

    }

    public MessageDao(StudentDao sender, String message, Status status, List<StudentDao> students) {
        this.sender = sender;
        this.message = message;
        this.status = status;
        this.students = students;
    }

    public List<StudentDao> getStudents() {
        return students;
    }

    public void setStudents(List<StudentDao> students) {
        this.students = students;
    }

    public StudentDao getSender() {
        return sender;
    }

    public void setSender(StudentDao sender) {
        this.sender = sender;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
