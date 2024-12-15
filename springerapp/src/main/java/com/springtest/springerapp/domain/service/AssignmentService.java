package com.springtest.springerapp.domain.service;

import java.util.Optional;
import java.util.Set;

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

    public Set<Assignment> getAll(User user) {
        return assignmentRepository.findByUser(user);
    }

    public Optional<Assignment> getRecordById(Long assingmentId, User user) {
        
        return assignmentRepository.findByIdAndUser(assingmentId, user);
    }

}
