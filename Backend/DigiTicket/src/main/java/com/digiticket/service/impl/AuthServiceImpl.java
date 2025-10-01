package com.digiticket.service.impl;

import com.digiticket.domain.Client;
import com.digiticket.domain.RoleUser;
import com.digiticket.domain.User;
import com.digiticket.domain.UserStatus;
import com.digiticket.dto.ClientRegisterRequest;
import com.digiticket.dto.ClientRegisterResponse;
import com.digiticket.dto.LoginRequest;
import com.digiticket.dto.LoginResponse;
import com.digiticket.service.AuthService;
import com.digiticket.service.ClientService;
import com.digiticket.service.UserService;
import com.digiticket.security.JwtProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Locale;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final ClientService clientService;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public AuthServiceImpl(UserService userService,
                           ClientService clientService,
                           PasswordEncoder passwordEncoder,
                           JwtProvider jwtProvider) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.clientService = clientService;
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userService.findByEmail(request.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas"));

        if (user.getPassword() == null || !passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas");
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

    @Override
    public ClientRegisterResponse registerClient(ClientRegisterRequest request) {
        final String email = request.email().trim().toLowerCase(Locale.ROOT);

        if(userService.emailExists(request.email())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "El correo ya está registrado");
        }

        User user = new User();
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setDocumentType(request.documentType());
        user.setDocumentNumber(request.documentNumber());
        user.setRoleUser(RoleUser.CLIENT);
        user.setStatus(UserStatus.ACTIVE);
        user.setTermsAcceptedAt(LocalDateTime.now());

        user=userService.save(user);

        Client  client = new Client();
        client.setUser(user);
        client.setBirthDate(request.birthDate());
        client.setPhoneNumber(request.phoneNumber());

        client=clientService.save( client);

        String token = jwtProvider.generateToken(
                user.getId(),
                user.getRoleUser().name()
        );

        return new ClientRegisterResponse(
                token,
                user.getId(),
                user.getFirstName(),
                user.getRoleUser().name()
        );
    }
}
