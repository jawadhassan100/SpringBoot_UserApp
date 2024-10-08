package com.example.myfirstapp.repository;

import com.example.myfirstapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Data JPA provides built-in methods for basic CRUD operations
}
