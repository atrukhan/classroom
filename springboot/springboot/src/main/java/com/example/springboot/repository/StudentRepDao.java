package com.example.springboot.repository;

import com.example.springboot.models.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentRepDao {

    private static final String HASH_KEY = "Student";
    @Autowired
    private RedisTemplate template;

    public Student save(Student student){
        template.opsForHash().put(HASH_KEY, student.getSessionId(), student);
        return student;
    }

    public List<Student> findAll(){
        return template.opsForHash().values(HASH_KEY);
    }

    public Student findStudentById(String id){
        return (Student) template.opsForHash().get(HASH_KEY, id);

    }

    public boolean deleteStudent(String id){
        template.opsForHash().delete(HASH_KEY, id);
        return true;
    }
}
