package com.farmManager.farmManager.repo;

import com.farmManager.farmManager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findUserById(Long id);
}
