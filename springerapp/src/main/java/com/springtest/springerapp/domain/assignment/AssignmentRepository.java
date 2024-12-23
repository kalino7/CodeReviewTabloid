package com.springtest.springerapp.domain.assignment;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springtest.springerapp.domain.user.User;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Set<Assignment> findByUser(User user);

    Optional<Assignment> findByIdAndUser(Long assingmentId, User user);

    boolean existsByIdAndUser(Long assignmentId, User user);
}
