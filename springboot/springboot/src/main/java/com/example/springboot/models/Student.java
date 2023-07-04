package com.example.springboot.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@RedisHash("StudentModel")
public class Student implements Serializable {

    private String sessionId;
    private String name;

    private int id;

    private boolean handUp;

    public Student() {
    }

    public Student(String sessionId,  int id, String name, boolean handUp) {
        this.sessionId = sessionId;
        this.name = name;
        this.id = id;
        this.handUp = handUp;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isHandUp() {
        return handUp;
    }

    public void setHandUp(boolean handUp) {
        this.handUp = handUp;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
