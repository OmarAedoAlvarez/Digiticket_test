package com.digiticket.service;

import com.digiticket.dto.LoginRequest;
import com.digiticket.dto.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
}
