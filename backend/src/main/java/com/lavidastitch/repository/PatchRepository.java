package com.lavidastitch.repository;

import com.lavidastitch.model.Patch;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatchRepository extends JpaRepository<Patch, String> {
    List<Patch> findAllByOrderBySortOrderAsc();
}
