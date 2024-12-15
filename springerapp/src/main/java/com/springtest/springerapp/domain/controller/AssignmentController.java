package com.springtest.springerapp.domain.controller;

import java.util.Optional;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springtest.springerapp.domain.assignment.Assignment;
import com.springtest.springerapp.domain.service.AssignmentService;
import com.springtest.springerapp.domain.user.User;

import lombok.RequiredArgsConstructor;




@RestController
@RequiredArgsConstructor
@RequestMapping("/api/assignments")
public class AssignmentController {

    private final AssignmentService assignmentService;

    @GetMapping("")
    public ResponseEntity<?> getAssignment(@AuthenticationPrincipal User user) {
        Set<Assignment> allAssignments = assignmentService.getAll(user);
        return ResponseEntity.ok(allAssignments);
    }
    
    @PostMapping("")
    public ResponseEntity<?> postAssignment(@AuthenticationPrincipal User user){
        Assignment response =  assignmentService.create(user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{assignmentId}")
    public ResponseEntity<?> getAssinmentRecord(@PathVariable Long assignmentId, @AuthenticationPrincipal User user) {
        Optional<Assignment> assingmentOpt = assignmentService.getRecordById(assignmentId, user);
        return ResponseEntity.ok(assingmentOpt.orElse(new Assignment()));
    }
    

}
