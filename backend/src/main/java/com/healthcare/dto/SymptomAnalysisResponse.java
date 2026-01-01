package com.healthcare.dto;

import java.util.List;

public class SymptomAnalysisResponse {
    private List<PossibleCondition> possibleConditions;
    private List<RecommendedDoctor> recommendedDoctors;
    private String urgencyLevel;

    // Constructors
    public SymptomAnalysisResponse() {}

    // Getters and Setters
    public List<PossibleCondition> getPossibleConditions() { return possibleConditions; }
    public void setPossibleConditions(List<PossibleCondition> possibleConditions) { this.possibleConditions = possibleConditions; }

    public List<RecommendedDoctor> getRecommendedDoctors() { return recommendedDoctors; }
    public void setRecommendedDoctors(List<RecommendedDoctor> recommendedDoctors) { this.recommendedDoctors = recommendedDoctors; }

    public String getUrgencyLevel() { return urgencyLevel; }
    public void setUrgencyLevel(String urgencyLevel) { this.urgencyLevel = urgencyLevel; }

    // Inner classes
    public static class PossibleCondition {
        private String name;
        private Integer probability;
        private String severity;
        private String description;
        private List<String> recommendedActions;

        // Constructors
        public PossibleCondition() {}

        public PossibleCondition(String name, Integer probability, String severity, String description, List<String> recommendedActions) {
            this.name = name;
            this.probability = probability;
            this.severity = severity;
            this.description = description;
            this.recommendedActions = recommendedActions;
        }

        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public Integer getProbability() { return probability; }
        public void setProbability(Integer probability) { this.probability = probability; }

        public String getSeverity() { return severity; }
        public void setSeverity(String severity) { this.severity = severity; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public List<String> getRecommendedActions() { return recommendedActions; }
        public void setRecommendedActions(List<String> recommendedActions) { this.recommendedActions = recommendedActions; }
    }

    public static class RecommendedDoctor {
        private String specialization;
        private String urgency;

        // Constructors
        public RecommendedDoctor() {}

        public RecommendedDoctor(String specialization, String urgency) {
            this.specialization = specialization;
            this.urgency = urgency;
        }

        // Getters and Setters
        public String getSpecialization() { return specialization; }
        public void setSpecialization(String specialization) { this.specialization = specialization; }

        public String getUrgency() { return urgency; }
        public void setUrgency(String urgency) { this.urgency = urgency; }
    }
}