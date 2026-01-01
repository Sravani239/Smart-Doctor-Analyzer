package com.healthcare.service;

import com.healthcare.entity.User;
import com.healthcare.repository.UserRepository;
import com.healthcare.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return userRepository.findByEmail(userPrincipal.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfile(User updatedUser) {
        User currentUser = getCurrentUser();
        
        if (updatedUser.getName() != null) {
            currentUser.setName(updatedUser.getName());
        }
        if (updatedUser.getAge() != null) {
            currentUser.setAge(updatedUser.getAge());
        }
        if (updatedUser.getGender() != null) {
            currentUser.setGender(updatedUser.getGender());
        }
        if (updatedUser.getPhone() != null) {
            currentUser.setPhone(updatedUser.getPhone());
        }
        if (updatedUser.getAddress() != null) {
            currentUser.setAddress(updatedUser.getAddress());
        }
        if (updatedUser.getMedicalHistory() != null) {
            currentUser.setMedicalHistory(updatedUser.getMedicalHistory());
        }

        return userRepository.save(currentUser);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> findAllPatients() {
        return userRepository.findActiveUsersByRole(User.Role.PATIENT);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setIsActive(false);
        userRepository.save(user);
    }
}