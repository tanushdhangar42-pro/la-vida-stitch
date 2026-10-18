package com.lavidastitch.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lavidastitch.model.Fabric;
import com.lavidastitch.model.Patch;
import com.lavidastitch.model.Product;
import com.lavidastitch.model.Role;
import com.lavidastitch.model.User;
import com.lavidastitch.repository.FabricRepository;
import com.lavidastitch.repository.PatchRepository;
import com.lavidastitch.repository.ProductRepository;
import com.lavidastitch.repository.UserRepository;
import java.io.InputStream;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Runs once at start-up. If the tables are empty it fills them from the JSON files in
 * src/main/resources/data and creates the first admin account.
 */
@Component
public class DataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final PatchRepository patchRepository;
    private final FabricRepository fabricRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    public DataLoader(ProductRepository productRepository, PatchRepository patchRepository,
                      FabricRepository fabricRepository, UserRepository userRepository,
                      PasswordEncoder passwordEncoder, ObjectMapper objectMapper) {
        this.productRepository = productRepository;
        this.patchRepository = patchRepository;
        this.fabricRepository = fabricRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            List<Product> products = read("data/products.json", new TypeReference<List<Product>>() {});
            for (int i = 0; i < products.size(); i++) products.get(i).setSortOrder(i);
            productRepository.saveAll(products);
        }
        if (patchRepository.count() == 0) {
            List<Patch> patches = read("data/patches.json", new TypeReference<List<Patch>>() {});
            for (int i = 0; i < patches.size(); i++) patches.get(i).setSortOrder(i);
            patchRepository.saveAll(patches);
        }
        if (fabricRepository.count() == 0) {
            List<Fabric> fabrics = read("data/fabrics.json", new TypeReference<List<Fabric>>() {});
            for (int i = 0; i < fabrics.size(); i++) fabrics.get(i).setSortOrder(i);
            fabricRepository.saveAll(fabrics);
        }
        if (!userRepository.existsByEmail(adminEmail)) {
            userRepository.save(new User("Admin", adminEmail, passwordEncoder.encode(adminPassword), Role.ADMIN));
        }
    }

    private <T> T read(String path, TypeReference<T> type) throws Exception {
        try (InputStream in = new ClassPathResource(path).getInputStream()) {
            return objectMapper.readValue(in, type);
        }
    }
}
