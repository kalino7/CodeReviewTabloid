package com.springtest.springerapp.domain;

import com.springtest.springerapp.domain.user.User;

import lombok.Data;

//automatically creates an assignment table for me with columns of the attributes
@Data
public class Assignment {

    private Long id;
    private String status;
    private String githuburl;
    private String branch;
    private String codeReviewVideoUrl;


    // @ManyToOne(optional=false)
    //false because we cannot have an entity relationship without a user
    private User user;
    // private User assignedTo;
}
