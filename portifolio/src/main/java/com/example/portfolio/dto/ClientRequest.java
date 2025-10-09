package com.example.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public record ClientRequest(@NotBlank(message = "O nome é obrigatório") String name,
                            @NotBlank(message = "O número é obrigatório") String number,
                            @NotBlank(message = "O email é obrigatório") String email,
                            @NotBlank(message = "Escreva algo!") String message) {}
