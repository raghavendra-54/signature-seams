package com.signatureseams.model;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="measurements")
public class Measurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String shoulder;
    private String chest;
    private String waist;
    private String sleeves;
    private String length;

    private Instant createdAt;

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getShoulder() { return shoulder; }
    public String getChest() { return chest; }
    public String getWaist() { return waist; }
    public String getSleeves() { return sleeves; }
    public String getLength() { return length; }
    public Instant getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setShoulder(String shoulder) { this.shoulder = shoulder; }
    public void setChest(String chest) { this.chest = chest; }
    public void setWaist(String waist) { this.waist = waist; }
    public void setSleeves(String sleeves) { this.sleeves = sleeves; }
    public void setLength(String length) { this.length = length; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
