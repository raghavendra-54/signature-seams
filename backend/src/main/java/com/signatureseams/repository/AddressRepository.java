package com.signatureseams.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.signatureseams.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUserId(Long userId);
}
