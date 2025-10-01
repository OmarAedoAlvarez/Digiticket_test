package com.digiticket.controller;

import com.digiticket.dto.ClientRegisterRequest;
import com.digiticket.dto.ClientRegisterResponse;
import com.digiticket.dto.LoginResponse;
import com.digiticket.dto.LoginRequest;
import com.digiticket.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) { this.authService = authService; }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req));
    }

    @PostMapping("/register")
    public  ResponseEntity<ClientRegisterResponse>  registerClient(@Valid @RequestBody ClientRegisterRequest req) {
        return  ResponseEntity.status(HttpStatus.CREATED).body(authService.registerClient(req));
    }
}