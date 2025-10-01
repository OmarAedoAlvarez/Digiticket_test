package com.digiticket.service;

import com.digiticket.domain.User;

import java.util.Optional;

public interface UserService {
    boolean emailExists(String email);
    Optional<User> findByEmail(String email);
    User save(User user);
}

