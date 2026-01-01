package com.healthcare.repository;

import com.healthcare.entity.SymptomAnalysis;
import com.healthcare.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SymptomAnalysisRepository extends JpaRepository<SymptomAnalysis, Long> {
    
    List<SymptomAnalysis> findByPatient(User patient);
    
    List<SymptomAnalysis> findByPatientOrderByCreatedAtDesc(User patient);
    
    List<SymptomAnalysis> findByUrgencyLevel(SymptomAnalysis.UrgencyLevel urgencyLevel);
    
    @Query("SELECT sa FROM SymptomAnalysis sa WHERE sa.patient = :patient AND sa.createdAt >= :startDate AND sa.createdAt <= :endDate")
    List<SymptomAnalysis> findByPatientAndDateRange(@Param("patient") User patient, 
                                                   @Param("startDate") LocalDateTime startDate, 
                                                   @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT sa FROM SymptomAnalysis sa WHERE sa.symptoms LIKE %:symptom% ORDER BY sa.createdAt DESC")
    List<SymptomAnalysis> findBySymptomContaining(@Param("symptom") String symptom);
}