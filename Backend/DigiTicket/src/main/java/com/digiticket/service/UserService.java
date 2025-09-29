package com.digiticket.service;

import com.digiticket.domain.User;

import java.util.Optional;

public interface UserService {
    boolean emailExists(String email);
    Optional<User> findByEmail(String email);
    User saveUser(User user);
    boolean validateUser(String email, String rawPassword);
}

