package com.lavidastitch.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Body of POST /api/auth/register */
public record RegisterRequest(
        @NotBlank(message = "Please enter your name.") String name,
        @NotBlank(message = "Please enter your email.") @Email(message = "Enter a valid email address.") String email,
        @NotBlank(message = "Please enter a password.") @Size(min = 6, message = "Password must be at least 6 characters.") String password) {
}
