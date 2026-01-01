package com.healthcare.service;

import com.healthcare.dto.SymptomAnalysisRequest;
import com.healthcare.dto.SymptomAnalysisResponse;
import com.healthcare.entity.SymptomAnalysis;
import com.healthcare.entity.User;
import com.healthcare.repository.SymptomAnalysisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SymptomAnalysisService {

    @Autowired
    private SymptomAnalysisRepository symptomAnalysisRepository;

    @Autowired
    private UserService userService;

    public SymptomAnalysisResponse analyzeSymptoms(SymptomAnalysisRequest request) {
        User currentUser = userService.getCurrentUser();
        
        // Convert symptoms to string for storage
        String symptomsString = request.getSymptoms().stream()
                .map(s -> s.getName() + " (" + s.getSeverity() + ", " + s.getDuration() + ")")
                .collect(Collectors.joining("; "));

        // Create and save symptom analysis
        SymptomAnalysis analysis = new SymptomAnalysis(currentUser, symptomsString);
        
        // Perform analysis (this is a simplified version - in production, you'd use ML/AI)
        SymptomAnalysisResponse response = performAnalysis(request);
        
        // Store analysis results
        analysis.setPossibleConditions(response.getPossibleConditions().stream()
                .map(c -> c.getName() + " (" + c.getProbability() + "%)")
                .collect(Collectors.joining("; ")));
        
        analysis.setRecommendedDoctors(response.getRecommendedDoctors().stream()
                .map(d -> d.getSpecialization())
                .collect(Collectors.joining("; ")));
        
        analysis.setUrgencyLevel(SymptomAnalysis.UrgencyLevel.valueOf(response.getUrgencyLevel().toUpperCase()));
        
        symptomAnalysisRepository.save(analysis);
        
        return response;
    }

    private SymptomAnalysisResponse performAnalysis(SymptomAnalysisRequest request) {
        SymptomAnalysisResponse response = new SymptomAnalysisResponse();
        
        // Simple rule-based analysis (in production, this would be more sophisticated)
        List<String> symptomNames = request.getSymptoms().stream()
                .map(s -> s.getName().toLowerCase())
                .collect(Collectors.toList());
        
        boolean hasSevereSymptoms = request.getSymptoms().stream()
                .anyMatch(s -> "severe".equalsIgnoreCase(s.getSeverity()));
        
        // Determine urgency level
        if (hasSevereSymptoms || symptomNames.contains("chest pain") || 
            symptomNames.contains("shortness of breath") || symptomNames.contains("severe headache")) {
            response.setUrgencyLevel("HIGH");
        } else if (symptomNames.contains("fever") || symptomNames.contains("persistent cough")) {
            response.setUrgencyLevel("MEDIUM");
        } else {
            response.setUrgencyLevel("LOW");
        }

        // Generate possible conditions
        response.setPossibleConditions(generatePossibleConditions(symptomNames));
        
        // Generate recommended doctors
        response.setRecommendedDoctors(generateRecommendedDoctors(symptomNames, response.getUrgencyLevel()));
        
        return response;
    }

    private List<SymptomAnalysisResponse.PossibleCondition> generatePossibleConditions(List<String> symptoms) {
        // Simplified condition matching
        if (symptoms.contains("fever") && symptoms.contains("cough")) {
            return Arrays.asList(
                new SymptomAnalysisResponse.PossibleCondition(
                    "Common Cold", 85, "low",
                    "A viral infection of the upper respiratory tract",
                    Arrays.asList("Rest", "Stay hydrated", "Monitor symptoms")
                ),
                new SymptomAnalysisResponse.PossibleCondition(
                    "Flu", 65, "medium",
                    "Influenza viral infection",
                    Arrays.asList("Rest", "Antiviral medication", "Seek medical attention if worsens")
                )
            );
        } else if (symptoms.contains("headache")) {
            return Arrays.asList(
                new SymptomAnalysisResponse.PossibleCondition(
                    "Tension Headache", 75, "low",
                    "Common type of headache caused by stress or tension",
                    Arrays.asList("Rest", "Pain relievers", "Stress management")
                ),
                new SymptomAnalysisResponse.PossibleCondition(
                    "Migraine", 45, "medium",
                    "Severe headache often with nausea and light sensitivity",
                    Arrays.asList("Dark room", "Migraine medication", "Consult neurologist")
                )
            );
        } else {
            return Arrays.asList(
                new SymptomAnalysisResponse.PossibleCondition(
                    "General Malaise", 60, "low",
                    "General feeling of discomfort or unease",
                    Arrays.asList("Rest", "Monitor symptoms", "Consult doctor if persists")
                )
            );
        }
    }

    private List<SymptomAnalysisResponse.RecommendedDoctor> generateRecommendedDoctors(List<String> symptoms, String urgencyLevel) {
        if (symptoms.contains("chest pain") || symptoms.contains("heart")) {
            return Arrays.asList(
                new SymptomAnalysisResponse.RecommendedDoctor("Cardiology", urgencyLevel.toLowerCase()),
                new SymptomAnalysisResponse.RecommendedDoctor("Emergency Medicine", "high")
            );
        } else if (symptoms.contains("headache") || symptoms.contains("dizziness")) {
            return Arrays.asList(
                new SymptomAnalysisResponse.RecommendedDoctor("Neurology", urgencyLevel.toLowerCase()),
                new SymptomAnalysisResponse.RecommendedDoctor("General Practice", "low")
            );
        } else {
            return Arrays.asList(
                new SymptomAnalysisResponse.RecommendedDoctor("General Practice", urgencyLevel.toLowerCase()),
                new SymptomAnalysisResponse.RecommendedDoctor("Internal Medicine", "low")
            );
        }
    }

    public List<SymptomAnalysis> getUserSymptomHistory() {
        User currentUser = userService.getCurrentUser();
        return symptomAnalysisRepository.findByPatientOrderByCreatedAtDesc(currentUser);
    }
}