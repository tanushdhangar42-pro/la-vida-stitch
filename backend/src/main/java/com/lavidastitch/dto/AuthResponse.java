package com.lavidastitch.dto;

/** What the server returns after a successful login or registration. */
public record AuthResponse(String token, String name, String email, String role) {
}
