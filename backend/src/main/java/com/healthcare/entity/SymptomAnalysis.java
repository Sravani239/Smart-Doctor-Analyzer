package com.healthcare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "symptom_analyses")
public class SymptomAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private User patient;

    @Column(columnDefinition = "TEXT", nullable = false)
    @NotBlank(message = "Symptoms are required")
    private String symptoms;

    @Column(columnDefinition = "TEXT")
    private String possibleConditions;

    @Column(columnDefinition = "TEXT")
    private String recommendedDoctors;

    @Enumerated(EnumType.STRING)
    @Column(name = "urgency_level")
    private UrgencyLevel urgencyLevel;

    @Column(columnDefinition = "TEXT")
    private String recommendations;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public SymptomAnalysis() {}

    public SymptomAnalysis(User patient, String symptoms) {
        this.patient = patient;
        this.symptoms = symptoms;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getPatient() { return patient; }
    public void setPatient(User patient) { this.patient = patient; }

    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }

    public String getPossibleConditions() { return possibleConditions; }
    public void setPossibleConditions(String possibleConditions) { this.possibleConditions = possibleConditions; }

    public String getRecommendedDoctors() { return recommendedDoctors; }
    public void setRecommendedDoctors(String recommendedDoctors) { this.recommendedDoctors = recommendedDoctors; }

    public UrgencyLevel getUrgencyLevel() { return urgencyLevel; }
    public void setUrgencyLevel(UrgencyLevel urgencyLevel) { this.urgencyLevel = urgencyLevel; }

    public String getRecommendations() { return recommendations; }
    public void setRecommendations(String recommendations) { this.recommendations = recommendations; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    // Enum
    public enum UrgencyLevel {
        LOW, MEDIUM, HIGH
    }
}