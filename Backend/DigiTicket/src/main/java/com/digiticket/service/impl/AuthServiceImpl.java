package com.digiticket.service.impl;

import com.digiticket.domain.User;
import com.digiticket.dto.LoginRequest;
import com.digiticket.dto.LoginResponse;
import com.digiticket.service.AuthService;
import com.digiticket.service.UserService;
import com.digiticket.security.JwtProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public AuthServiceImpl(UserService userService,
                           PasswordEncoder passwordEncoder,
                           JwtProvider jwtProvider) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userService.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("Credenciales incorrectas"));

        if (user.getPassword() == null || !passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new IllegalArgumentException("Credenciales incorrectas");
        }

        String token = jwtProvider.generateToken(
                user.getId(),
                user.getRoleUser().name()
        );

        return new LoginResponse(
                token,
                user.getId(),
                user.getFirstName(),
                user.getRoleUser().name()
        );
    }
}
