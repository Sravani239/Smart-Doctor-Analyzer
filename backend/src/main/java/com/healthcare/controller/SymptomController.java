package com.healthcare.controller;

import com.healthcare.dto.SymptomAnalysisRequest;
import com.healthcare.dto.SymptomAnalysisResponse;
import com.healthcare.entity.SymptomAnalysis;
import com.healthcare.service.SymptomAnalysisService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/symptoms")
public class SymptomController {

    @Autowired
    private SymptomAnalysisService symptomAnalysisService;

    @PostMapping("/analyze")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> analyzeSymptoms(@Valid @RequestBody SymptomAnalysisRequest request) {
        try {
            SymptomAnalysisResponse response = symptomAnalysisService.analyzeSymptoms(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/history")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<SymptomAnalysis>> getSymptomHistory() {
        List<SymptomAnalysis> history = symptomAnalysisService.getUserSymptomHistory();
        return ResponseEntity.ok(history);
    }
}