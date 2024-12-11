package com.springtest.springerapp.domain.assignment;

import com.springtest.springerapp.domain.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

//automatically creates an assignment table for me with columns of the attributes
@Data
@Entity
public class Assignment {

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String status;
    private String githuburl;
    private String branch;
    private String codeReviewVideoUrl;


    @ManyToOne(optional=false) //false because we cannot have an entity relationship without a user
    private User user;
}
