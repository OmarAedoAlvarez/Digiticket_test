package com.digiticket.dto;

public record LoginResponse(
        String token,
        Integer id,
        String role,
        String name) {}