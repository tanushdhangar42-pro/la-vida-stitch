package com.lavidastitch.dto;

import java.util.List;

/** Body of POST /api/customizations (the design chosen on the Customize page). */
public record CustomizationRequest(String baseColor, String fabric, List<String> patchIds, String size, int price) {
}
