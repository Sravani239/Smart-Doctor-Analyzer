package com.healthcare.controller;

import com.healthcare.entity.Doctor;
import com.healthcare.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/public/all")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllActiveDoctors();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<?> getDoctorById(@PathVariable Long id) {
        return doctorService.findById(id)
                .map(doctor -> ResponseEntity.ok().body(doctor))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/public/search")
    public ResponseEntity<List<Doctor>> searchDoctors(@RequestParam String q) {
        List<Doctor> doctors = doctorService.searchDoctors(q);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/public/specialization/{specialization}")
    public ResponseEntity<List<Doctor>> getDoctorsBySpecialization(@PathVariable String specialization) {
        List<Doctor> doctors = doctorService.findBySpecialization(specialization);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/public/available-today")
    public ResponseEntity<List<Doctor>> getAvailableDoctors() {
        List<Doctor> doctors = doctorService.findAvailableToday();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/public/top-rated")
    public ResponseEntity<List<Doctor>> getTopRatedDoctors(@RequestParam(defaultValue = "4.0") BigDecimal minRating) {
        List<Doctor> doctors = doctorService.findByMinimumRating(minRating);
        return ResponseEntity.ok(doctors);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createDoctor(@RequestBody Doctor doctor) {
        try {
            Doctor savedDoctor = doctorService.saveDoctor(doctor);
            return ResponseEntity.ok(savedDoctor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    public ResponseEntity<?> updateDoctor(@PathVariable Long id, @RequestBody Doctor doctorDetails) {
        try {
            Doctor doctor = doctorService.findById(id)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));
            
            // Update doctor details
            doctor.setName(doctorDetails.getName());
            doctor.setSpecialization(doctorDetails.getSpecialization());
            doctor.setYearsOfExperience(doctorDetails.getYearsOfExperience());
            doctor.setEducation(doctorDetails.getEducation());
            doctor.setAbout(doctorDetails.getAbout());
            doctor.setConsultationFee(doctorDetails.getConsultationFee());
            doctor.setHospitalName(doctorDetails.getHospitalName());
            doctor.setHospitalAddress(doctorDetails.getHospitalAddress());
            doctor.setAvailableToday(doctorDetails.getAvailableToday());
            doctor.setNextAvailable(doctorDetails.getNextAvailable());
            doctor.setLanguages(doctorDetails.getLanguages());

            Doctor updatedDoctor = doctorService.saveDoctor(doctor);
            return ResponseEntity.ok(updatedDoctor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteDoctor(@PathVariable Long id) {
        try {
            doctorService.deleteDoctor(id);
            return ResponseEntity.ok("Doctor deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}