package com.example.springboot.dao;


public class StudentDao {

    private int id;

    private String name;

    private boolean handUp;

    public StudentDao() {
    }

    public StudentDao(int id, String name, boolean handUp) {
        this.id = id;

        this.name = name;
        this.handUp = handUp;
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
