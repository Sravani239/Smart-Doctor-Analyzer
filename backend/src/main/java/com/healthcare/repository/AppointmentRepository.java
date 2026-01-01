package com.healthcare.repository;

import com.healthcare.entity.Appointment;
import com.healthcare.entity.User;
import com.healthcare.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    List<Appointment> findByPatient(User patient);
    
    List<Appointment> findByDoctor(Doctor doctor);
    
    List<Appointment> findByPatientOrderByAppointmentDateDesc(User patient);
    
    List<Appointment> findByDoctorOrderByAppointmentDateDesc(Doctor doctor);
    
    List<Appointment> findByStatus(Appointment.AppointmentStatus status);
    
    @Query("SELECT a FROM Appointment a WHERE a.patient = :patient AND a.appointmentDate >= :startDate AND a.appointmentDate <= :endDate")
    List<Appointment> findByPatientAndDateRange(@Param("patient") User patient, 
                                               @Param("startDate") LocalDateTime startDate, 
                                               @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT a FROM Appointment a WHERE a.doctor = :doctor AND a.appointmentDate >= :startDate AND a.appointmentDate <= :endDate")
    List<Appointment> findByDoctorAndDateRange(@Param("doctor") Doctor doctor, 
                                              @Param("startDate") LocalDateTime startDate, 
                                              @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate >= :today ORDER BY a.appointmentDate ASC")
    List<Appointment> findUpcomingAppointments(@Param("today") LocalDateTime today);
    
    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.doctor = :doctor AND a.appointmentDate >= :startDate AND a.appointmentDate <= :endDate")
    Long countAppointmentsByDoctorAndDateRange(@Param("doctor") Doctor doctor, 
                                              @Param("startDate") LocalDateTime startDate, 
                                              @Param("endDate") LocalDateTime endDate);
}