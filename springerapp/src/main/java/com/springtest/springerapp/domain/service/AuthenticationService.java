package com.springtest.springerapp.domain.service;

import org.springframework.stereotype.Service;

import com.springtest.springerapp.domain.controller.auth.AuthenticationResponse;
import com.springtest.springerapp.domain.controller.auth.RegisterRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    public AuthenticationResponse authenticate(){
        return null;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        //Todo
        return null;

    }

}
