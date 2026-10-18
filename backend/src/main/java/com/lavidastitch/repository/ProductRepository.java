package com.lavidastitch.repository;

import com.lavidastitch.model.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findAllByOrderBySortOrderAsc();
}
