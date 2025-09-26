package com.digiticket.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity // opcional: habilita @PreAuthorize, etc.
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        // BCrypt con “strength” por defecto (10). Puedes subirlo si lo necesitas.
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Config mínima para desarrollo: deshabilita CSRF para endpoints stateless
        // y permite todo (ajústalo cuando agregues roles/paths protegidos).
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
