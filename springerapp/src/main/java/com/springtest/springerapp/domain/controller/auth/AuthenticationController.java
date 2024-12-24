package com.springtest.springerapp.domain.controller.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springtest.springerapp.domain.service.AuthenticationService;
import com.springtest.springerapp.domain.service.JwtService;
import com.springtest.springerapp.domain.user.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path="/api/connect")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;
    private final JwtService jwtService;
    
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
        
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticateRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/validate")
    public ResponseEntity<?> checkToken(@RequestParam String token, @AuthenticationPrincipal User user){
        boolean isTokenValid = jwtService.isTokenValid(token, user);
        return ResponseEntity.ok(isTokenValid);
    }
    
    

}
