package com.springtest.springerapp.domain.service;

import org.springframework.stereotype.Service;

import com.springtest.springerapp.domain.assignment.Assignment;
import com.springtest.springerapp.domain.assignment.AssignmentRepository;
import com.springtest.springerapp.domain.user.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    public Assignment create(User user) {
        Assignment assignment = new Assignment();
        assignment.setStatus("open: submitted ");
        assignment.setUser(user);
        return assignmentRepository.save(assignment);
    }

}
