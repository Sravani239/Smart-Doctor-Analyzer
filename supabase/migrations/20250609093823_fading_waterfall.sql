-- Smart Doctor Recommender Database Schema
-- MySQL Database Setup

-- Create database
CREATE DATABASE IF NOT EXISTS healthcare_db;
USE healthcare_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INT,
    gender ENUM('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'),
    phone VARCHAR(20),
    address TEXT,
    medical_history TEXT,
    profile_image VARCHAR(500),
    role ENUM('PATIENT', 'DOCTOR', 'ADMIN') NOT NULL DEFAULT 'PATIENT',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_active (is_active)
);

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    years_of_experience INT,
    education TEXT,
    about TEXT,
    rating DECIMAL(2,1) DEFAULT 0.0,
    review_count INT DEFAULT 0,
    consultation_fee DECIMAL(10,2),
    profile_image VARCHAR(500),
    hospital_name VARCHAR(200),
    hospital_address TEXT,
    available_today BOOLEAN DEFAULT TRUE,
    next_available VARCHAR(100),
    languages TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_specialization (specialization),
    INDEX idx_rating (rating),
    INDEX idx_available (available_today),
    INDEX idx_active (is_active)
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    appointment_date DATETIME NOT NULL,
    status ENUM('SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW') DEFAULT 'SCHEDULED',
    appointment_type ENUM('CONSULTATION', 'FOLLOW_UP', 'CHECK_UP', 'EMERGENCY', 'SPECIALIST_REFERRAL') DEFAULT 'CONSULTATION',
    notes TEXT,
    symptoms TEXT,
    diagnosis TEXT,
    prescription TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    INDEX idx_patient (patient_id),
    INDEX idx_doctor (doctor_id),
    INDEX idx_appointment_date (appointment_date),
    INDEX idx_status (status)
);

-- Symptom analyses table
CREATE TABLE IF NOT EXISTS symptom_analyses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    symptoms TEXT NOT NULL,
    possible_conditions TEXT,
    recommended_doctors TEXT,
    urgency_level ENUM('LOW', 'MEDIUM', 'HIGH'),
    recommendations TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_patient (patient_id),
    INDEX idx_urgency (urgency_level),
    INDEX idx_created_at (created_at)
);

-- Insert sample data
-- Admin user (password: admin123)
INSERT INTO users (name, email, password, role, profile_image) VALUES 
('Admin User', 'admin@healthcare.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop');

-- Sample patient (password: patient123)
INSERT INTO users (name, email, password, age, gender, phone, address, medical_history, role, profile_image) VALUES 
('John Doe', 'patient@healthcare.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 30, 'MALE', '+1-234-567-8900', '123 Health Street, Medical City', 'No significant medical history', 'PATIENT', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop');

-- Sample doctors
INSERT INTO doctors (name, specialization, years_of_experience, education, about, rating, review_count, consultation_fee, profile_image, hospital_name, hospital_address, available_today, next_available, languages) VALUES 
('Dr. Sarah Johnson', 'Cardiology', 15, 'MD, Harvard Medical School', 'Specialized in preventive cardiology and heart disease management with over 15 years of experience.', 4.9, 127, 150.00, 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'Central Hospital', 'Downtown Medical Center', TRUE, 'Today 3:00 PM', 'English, Spanish'),

('Dr. Michael Chen', 'Neurology', 12, 'MD, Johns Hopkins University', 'Expert in neurological disorders, stroke prevention, and migraine management.', 4.8, 89, 180.00, 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'Northside Clinic', 'Northside Clinic', FALSE, 'Tomorrow 10:00 AM', 'English, Mandarin'),

('Dr. Emily Rodriguez', 'General Practice', 8, 'MD, Stanford University', 'Family medicine specialist focusing on comprehensive primary care and preventive medicine.', 4.7, 203, 120.00, 'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'Westside Medical', 'Westside Medical', TRUE, 'Today 5:30 PM', 'English, Spanish, Portuguese'),

('Dr. David Kim', 'Dermatology', 10, 'MD, UCLA Medical School', 'Board-certified dermatologist specializing in skin cancer prevention and cosmetic dermatology.', 4.9, 156, 160.00, 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'Central Hospital', 'Downtown Medical Center', TRUE, 'Today 2:15 PM', 'English, Korean'),

('Dr. Lisa Thompson', 'Pediatrics', 14, 'MD, Children\'s Hospital Boston', 'Pediatric specialist with expertise in child development and adolescent medicine.', 4.8, 174, 140.00, 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'Eastside Health Center', 'Eastside Health Center', FALSE, 'Monday 9:00 AM', 'English, French'),

('Dr. Robert Martinez', 'Orthopedics', 18, 'MD, Mayo Clinic', 'Orthopedic surgeon specializing in sports medicine and joint replacement surgery.', 4.6, 98, 200.00, 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'Central Hospital', 'Downtown Medical Center', TRUE, 'Today 4:45 PM', 'English, Spanish');