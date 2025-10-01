package com.digiticket.dto;

public record ClientRegisterResponse(
        String toke,
        Integer id,
        String role,
        String name) {}
