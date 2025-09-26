package com.digiticket.repository;

import com.digiticket.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    // Verificar si un correo ya está registrado
    boolean existsByEmail(String email);
    // Buscar usuario por correo (para validar login)
    Optional<User> findByEmail(String email);
}
