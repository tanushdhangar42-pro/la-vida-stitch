package com.lavidastitch.controller;

import com.lavidastitch.model.Patch;
import com.lavidastitch.repository.PatchRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** GET /api/patches */
@RestController
@RequestMapping("/api/patches")
public class PatchController {

    private final PatchRepository patchRepository;

    public PatchController(PatchRepository patchRepository) {
        this.patchRepository = patchRepository;
    }

    @GetMapping
    public List<Patch> all() {
        return patchRepository.findAllByOrderBySortOrderAsc();
    }
}
