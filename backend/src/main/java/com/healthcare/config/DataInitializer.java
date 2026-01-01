package com.healthcare.config;

import com.healthcare.entity.Doctor;
import com.healthcare.entity.User;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize sample data if database is empty
        if (userRepository.count() == 0) {
            initializeUsers();
        }
        
        if (doctorRepository.count() == 0) {
            initializeDoctors();
        }
    }

    private void initializeUsers() {
        // Create admin user
        User admin = new User();
        admin.setName("Admin User");
        admin.setEmail("admin@healthcare.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(User.Role.ADMIN);
        admin.setProfileImage("https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop");
        userRepository.save(admin);

        // Create sample patient
        User patient = new User();
        patient.setName("John Doe");
        patient.setEmail("patient@healthcare.com");
        patient.setPassword(passwordEncoder.encode("patient123"));
        patient.setAge(30);
        patient.setGender(User.Gender.MALE);
        patient.setPhone("+1-234-567-8900");
        patient.setAddress("123 Health Street, Medical City");
        patient.setMedicalHistory("No significant medical history");
        patient.setRole(User.Role.PATIENT);
        patient.setProfileImage("https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop");
        userRepository.save(patient);
    }

    private void initializeDoctors() {
        // Sample doctors data
        Doctor[] doctors = {
            createDoctor("Dr. Sarah Johnson", "Cardiology", 15, "MD, Harvard Medical School", 
                        "Specialized in preventive cardiology and heart disease management with over 15 years of experience.",
                        new BigDecimal("4.9"), 127, new BigDecimal("150"), 
                        "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
                        "Central Hospital", "Downtown Medical Center", true, "Today 3:00 PM", "English, Spanish"),
            
            createDoctor("Dr. Michael Chen", "Neurology", 12, "MD, Johns Hopkins University",
                        "Expert in neurological disorders, stroke prevention, and migraine management.",
                        new BigDecimal("4.8"), 89, new BigDecimal("180"),
                        "https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
                        "Northside Clinic", "Northside Clinic", false, "Tomorrow 10:00 AM", "English, Mandarin"),
            
            createDoctor("Dr. Emily Rodriguez", "General Practice", 8, "MD, Stanford University",
                        "Family medicine specialist focusing on comprehensive primary care and preventive medicine.",
                        new BigDecimal("4.7"), 203, new BigDecimal("120"),
                        "https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
                        "Westside Medical", "Westside Medical", true, "Today 5:30 PM", "English, Spanish, Portuguese"),
            
            createDoctor("Dr. David Kim", "Dermatology", 10, "MD, UCLA Medical School",
                        "Board-certified dermatologist specializing in skin cancer prevention and cosmetic dermatology.",
                        new BigDecimal("4.9"), 156, new BigDecimal("160"),
                        "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
                        "Central Hospital", "Downtown Medical Center", true, "Today 2:15 PM", "English, Korean"),
            
            createDoctor("Dr. Lisa Thompson", "Pediatrics", 14, "MD, Children's Hospital Boston",
                        "Pediatric specialist with expertise in child development and adolescent medicine.",
                        new BigDecimal("4.8"), 174, new BigDecimal("140"),
                        "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
                        "Eastside Health Center", "Eastside Health Center", false, "Monday 9:00 AM", "English, French"),
            
            createDoctor("Dr. Robert Martinez", "Orthopedics", 18, "MD, Mayo Clinic",
                        "Orthopedic surgeon specializing in sports medicine and joint replacement surgery.",
                        new BigDecimal("4.6"), 98, new BigDecimal("200"),
                        "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
                        "Central Hospital", "Downtown Medical Center", true, "Today 4:45 PM", "English, Spanish")
        };

        for (Doctor doctor : doctors) {
            doctorRepository.save(doctor);
        }
    }

    private Doctor createDoctor(String name, String specialization, int experience, String education,
                               String about, BigDecimal rating, int reviewCount, BigDecimal fee,
                               String image, String hospital, String address, boolean available,
                               String nextAvailable, String languages) {
        Doctor doctor = new Doctor();
        doctor.setName(name);
        doctor.setSpecialization(specialization);
        doctor.setYearsOfExperience(experience);
        doctor.setEducation(education);
        doctor.setAbout(about);
        doctor.setRating(rating);
        doctor.setReviewCount(reviewCount);
        doctor.setConsultationFee(fee);
        doctor.setProfileImage(image);
        doctor.setHospitalName(hospital);
        doctor.setHospitalAddress(address);
        doctor.setAvailableToday(available);
        doctor.setNextAvailable(nextAvailable);
        doctor.setLanguages(languages);
        return doctor;
    }
}