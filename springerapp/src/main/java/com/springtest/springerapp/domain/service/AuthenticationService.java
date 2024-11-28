package com.springtest.springerapp.domain.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springtest.springerapp.domain.controller.auth.AuthenticateRequest;
import com.springtest.springerapp.domain.controller.auth.AuthenticationResponse;
import com.springtest.springerapp.domain.controller.auth.RegisterRequest;
import com.springtest.springerapp.domain.user.Role;
import com.springtest.springerapp.domain.user.User;
import com.springtest.springerapp.domain.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    private AuthenticationResponse actualResponse(User user)
    {
        var token = jwtService.generatToken(user);
        return AuthenticationResponse.builder().token(token).build();
    }

    public AuthenticationResponse authenticate(AuthenticateRequest request){
        //verify user authentication
        //throws error if none found
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        // get user and then generate token
        var verifiedUser = userRepository.findByUsername(request.getUsername()).orElseThrow();

        return actualResponse(verifiedUser);
    }

    public AuthenticationResponse register(RegisterRequest request) {
        //register user
        var regUser = User.builder()
        .firstName(request.getFirstName())
        .lastName(request.getLastName())
        .username(request.getUsername())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(Role.USER)
        .build();
        userRepository.save(regUser);

        //generate token for just registered user and return status
        return actualResponse(regUser);

    }

}
