package com.lavidastitch.dto;

import jakarta.validation.constraints.NotBlank;

/** Body of POST /api/auth/login */
public record LoginRequest(
        @NotBlank(message = "Please enter your email.") String email,
        @NotBlank(message = "Please enter your password.") String password) {
}
