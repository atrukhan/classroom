package com.example.springboot;


import com.example.springboot.dao.MessageDao;
import com.example.springboot.dao.StudentDao;
import com.example.springboot.models.Status;
import com.example.springboot.models.Student;
import com.example.springboot.repository.StudentRepDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Controller
public class Controller {

    @Autowired
    private StudentRepDao dao;
    private int lastId = 0;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private static final int NOT_ERROR_NAME = -1;
    private static final int ERROR_EQUAL_NAME = 0;
    private static final int ERROR_LENGTH_NAME = 1;
    private int checkName(List<Student> students, String name){
        for(int i = 0; i < students.size(); i++){
            if(students.get(i).getName().equals(name))
                return ERROR_EQUAL_NAME;
        }
        if(name.length() < 1){
            return ERROR_LENGTH_NAME;
        }
        return NOT_ERROR_NAME;
    }

    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event){

        Student sender = dao.findStudentById(event.getSessionId());
        if(sender != null){
            dao.deleteStudent(event.getSessionId());

            MessageDao message = new MessageDao(convertStudentToDao(sender), null, Status.LEAVE, null);

            messagingTemplate.convertAndSend("/classroom/public", message);
        }

    }

    private StudentDao convertStudentToDao(Student student){
        return new StudentDao(student.getId(), student.getName(), student.isHandUp());
    }
    private List<StudentDao> convertStudentListToDao(List<Student> students){
        List<StudentDao> studentDaoList = new ArrayList<>();
        for(int i = 0; i < students.size(); i++){
            studentDaoList.add(convertStudentToDao(students.get(i)));
        }
        return studentDaoList;
    }

    @MessageMapping("/message")
    @SendTo("/classroom/public")
    public MessageDao receivePublicMessage(@Payload MessageDao message, @Header String simpSessionId) throws Exception {
        if (message.getStatus() == Status.JOIN){

            List<Student> students = dao.findAll();
            StudentDao sender = message.getSender();

            int errorCode = checkName(students, message.getSender().getName());

            if(errorCode== NOT_ERROR_NAME){
                message.setStudents(convertStudentListToDao(students));

                sender.setId(lastId);
                message.setSender(sender);

                dao.save(new Student(simpSessionId, lastId, message.getSender().getName(), false));
                lastId++;
            }else{
                message.setStatus(Status.ERROR);
                switch (errorCode){
                    case ERROR_EQUAL_NAME ->  message.setMessage("This username is already taken.");
                    case ERROR_LENGTH_NAME -> message.setMessage("This username is incorrect. Username can't be empty.");
                }

            }


        }

        if(message.getStatus() == Status.HAND){
            Student sender = dao.findStudentById(simpSessionId);
            if(message.getSender().getId() == sender.getId()) {
                dao.save(new Student(sender.getSessionId(), sender.getId(), sender.getName(), !sender.isHandUp()));
            }
        }

        return message;
    }

}