package com.springtest.springerapp.domain.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @PostMapping("")
    public ResponseEntity<?> assignment(@AuthenticationPrincipal User user){
        Assignment response =  assignmentService.create(user);
        return ResponseEntity.ok(response);
    }

}
