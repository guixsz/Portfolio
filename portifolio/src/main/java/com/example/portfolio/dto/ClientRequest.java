package com.example.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public record ClientRequest(@NotBlank String name, @NotBlank String number, @NotBlank String email, @NotBlank String message) {}
