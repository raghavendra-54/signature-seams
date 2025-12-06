package com.signatureseams.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.signatureseams.model.Measurement;

public interface MeasurementRepository extends JpaRepository<Measurement, Long> {
    List<Measurement> findByUserId(Long userId);
}
