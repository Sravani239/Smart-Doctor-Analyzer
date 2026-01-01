package com.healthcare.service;

import com.healthcare.entity.Doctor;
import com.healthcare.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllActiveDoctors() {
        return doctorRepository.findByIsActiveTrue();
    }

    public Optional<Doctor> findById(Long id) {
        return doctorRepository.findById(id);
    }

    public List<Doctor> findBySpecialization(String specialization) {
        return doctorRepository.findBySpecializationAndIsActiveTrue(specialization);
    }

    public List<Doctor> searchDoctors(String searchTerm) {
        return doctorRepository.searchDoctors(searchTerm);
    }

    public List<Doctor> findAvailableToday() {
        return doctorRepository.findAvailableToday();
    }

    public List<Doctor> findByMinimumRating(BigDecimal minRating) {
        return doctorRepository.findByMinimumRating(minRating);
    }

    public List<Doctor> findBySpecializations(List<String> specializations) {
        return doctorRepository.findBySpecializationsOrderByRating(specializations);
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        doctor.setIsActive(false);
        doctorRepository.save(doctor);
    }
}