package com.lavidastitch.repository;

import com.lavidastitch.model.Customization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomizationRepository extends JpaRepository<Customization, Long> {
}
