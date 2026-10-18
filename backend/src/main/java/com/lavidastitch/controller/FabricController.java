package com.lavidastitch.controller;

import com.lavidastitch.model.Fabric;
import com.lavidastitch.repository.FabricRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** GET /api/fabrics */
@RestController
@RequestMapping("/api/fabrics")
public class FabricController {

    private final FabricRepository fabricRepository;

    public FabricController(FabricRepository fabricRepository) {
        this.fabricRepository = fabricRepository;
    }

    @GetMapping
    public List<Fabric> all() {
        return fabricRepository.findAllByOrderBySortOrderAsc();
    }
}
