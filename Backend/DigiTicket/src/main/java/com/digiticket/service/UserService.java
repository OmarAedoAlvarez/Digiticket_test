package com.digiticket.service;

import com.digiticket.domain.User;

import java.util.Optional;

public interface UserService {
     //Verifica si un correo ya está registrado.
    boolean emailExists(String email);
     //Busca un usuario por su correo.
    Optional<User> findByEmail(String email);
    //Guarda un usuario (hasheando contraseña si viene en texto plano).
    User saveUser(User user);
    //Valida credenciales comparando la contraseña ingresada contra el hash almacenado.
    boolean validateUser(String email, String rawPassword);
}
