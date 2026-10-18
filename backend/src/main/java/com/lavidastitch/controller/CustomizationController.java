package com.lavidastitch.controller;

import com.lavidastitch.dto.CustomizationRequest;
import com.lavidastitch.model.Customization;
import com.lavidastitch.repository.CustomizationRepository;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** POST /api/customizations : saves the tee design chosen on the Customize page. */
@RestController
@RequestMapping("/api/customizations")
public class CustomizationController {

    private final CustomizationRepository customizationRepository;

    public CustomizationController(CustomizationRepository customizationRepository) {
        this.customizationRepository = customizationRepository;
    }

    @PostMapping
    public Customization save(@RequestBody CustomizationRequest request, Authentication authentication) {
        Customization design = new Customization();
        design.setBaseColor(request.baseColor());
        design.setFabric(request.fabric());
        design.setPatchIds(request.patchIds() == null ? "" : String.join(",", request.patchIds()));
        design.setSize(request.size());
        design.setPrice(request.price());
        boolean loggedIn = authentication != null && !(authentication instanceof AnonymousAuthenticationToken);
        design.setUserEmail(loggedIn ? authentication.getName() : null);
        return customizationRepository.save(design);
    }
}
