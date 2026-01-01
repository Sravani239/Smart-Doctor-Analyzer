package com.healthcare.repository;

import com.healthcare.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    
    List<Doctor> findByIsActiveTrue();
    
    List<Doctor> findBySpecializationAndIsActiveTrue(String specialization);
    
    List<Doctor> findBySpecializationContainingIgnoreCaseAndIsActiveTrue(String specialization);
    
    List<Doctor> findByHospitalNameContainingIgnoreCaseAndIsActiveTrue(String hospitalName);
    
    @Query("SELECT d FROM Doctor d WHERE d.isActive = true AND d.rating >= :minRating ORDER BY d.rating DESC")
    List<Doctor> findByMinimumRating(@Param("minRating") BigDecimal minRating);
    
    @Query("SELECT d FROM Doctor d WHERE d.isActive = true AND d.availableToday = true")
    List<Doctor> findAvailableToday();
    
    @Query("SELECT d FROM Doctor d WHERE d.isActive = true AND " +
           "(d.name LIKE %:searchTerm% OR d.specialization LIKE %:searchTerm% OR d.hospitalName LIKE %:searchTerm%)")
    List<Doctor> searchDoctors(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT d FROM Doctor d WHERE d.isActive = true AND d.specialization IN :specializations ORDER BY d.rating DESC")
    List<Doctor> findBySpecializationsOrderByRating(@Param("specializations") List<String> specializations);
}