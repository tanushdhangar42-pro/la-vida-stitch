package com.lavidastitch.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

/** One cart line sent with an order. */
public record OrderItemRequest(
        @NotBlank String productId,
        @NotBlank String name,
        List<String> patchIds,
        String patchName,
        @NotBlank String size,
        @NotBlank String color,
        @Min(value = 1, message = "Quantity must be at least 1.") int quantity,
        @Min(value = 0, message = "Invalid price.") int unitPrice) {
}
