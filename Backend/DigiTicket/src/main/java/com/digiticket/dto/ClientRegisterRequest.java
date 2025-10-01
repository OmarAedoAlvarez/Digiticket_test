package com.digiticket.dto;

import com.digiticket.domain.DocumentType;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record ClientRegisterRequest(
        @NotBlank String firstName,
        @NotBlank String lastName,
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8) String password,   // ← evita vacío o menor a 8
        @NotNull DocumentType documentType,
        @NotBlank String documentNumber,
        @Past LocalDate birthDate,
        String phoneNumber
) {}


