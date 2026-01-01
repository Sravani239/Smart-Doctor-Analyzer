package com.healthcare.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class SymptomAnalysisRequest {
    @NotEmpty(message = "Symptoms list cannot be empty")
    private List<SymptomDto> symptoms;

    // Constructors
    public SymptomAnalysisRequest() {}

    public SymptomAnalysisRequest(List<SymptomDto> symptoms) {
        this.symptoms = symptoms;
    }

    // Getters and Setters
    public List<SymptomDto> getSymptoms() { return symptoms; }
    public void setSymptoms(List<SymptomDto> symptoms) { this.symptoms = symptoms; }

    // Inner class for individual symptoms
    public static class SymptomDto {
        private String name;
        private String severity; // mild, moderate, severe
        private String duration;

        // Constructors
        public SymptomDto() {}

        public SymptomDto(String name, String severity, String duration) {
            this.name = name;
            this.severity = severity;
            this.duration = duration;
        }

        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getSeverity() { return severity; }
        public void setSeverity(String severity) { this.severity = severity; }

        public String getDuration() { return duration; }
        public void setDuration(String duration) { this.duration = duration; }
    }
}