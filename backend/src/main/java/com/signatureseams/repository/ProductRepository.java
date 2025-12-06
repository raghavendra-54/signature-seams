package com.signatureseams.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.signatureseams.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {}
