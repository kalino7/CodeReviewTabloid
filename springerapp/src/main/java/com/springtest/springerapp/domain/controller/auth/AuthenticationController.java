package com.springtest.springerapp.domain.controller.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springtest.springerapp.domain.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path="/api/connect")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;
    
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
        
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticateRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
    
    

}
