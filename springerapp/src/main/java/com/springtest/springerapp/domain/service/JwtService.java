package com.springtest.springerapp.domain.service;

import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.springtest.springerapp.domain.config.SecurityProperties;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService { 
    
    private final SecurityProperties securityProperties;

    private static String PASS_KEY;

    @PostConstruct
    public void init(){
        PASS_KEY = securityProperties.getEncryptionKey();
    }

    public String extractUsername(String jwtToken) {
        return extractClaim(jwtToken, Claims::getSubject);
    }

    public String generatToken(UserDetails userDetails)
    {
        return generateToken(new HashMap<>(), userDetails);
    }

    private <T>T extractClaim(String jwtToken, Function<Claims, T> claimsResolver)
    {
        // Functional interface Function<x, y>
        // pass a type of X to the function and return output Y
        // Claims::getSubject => Passes Claims as X and returns String as Y because of getSubject
        // Claims::getExpirationDate => Passes Claims as X and returns Date as Y because of getExpirationDate
        final Claims claims = extractAllClaims(jwtToken);
        // returns only interested claim which we want eg: getSubject
        return claimsResolver.apply(claims);
    }
    
    public String generateToken(HashMap<String, Object> extraClaims, UserDetails userDetails){
        return Jwts.builder()
        .claims(extraClaims)
        .subject(userDetails.getUsername())
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
        .signWith(getSignKey())
        .compact();
    }

    public boolean isTokenValid(String jwtToken, UserDetails userDetails)
    {
        final String authUsername = extractUsername(jwtToken);
        return authUsername.equals(userDetails.getUsername()) && !isTokenExpired(jwtToken);
    }

    private Claims extractAllClaims(String jwtToken)
    {
        return Jwts.parser().verifyWith(getSignKey()).build().parseSignedClaims(jwtToken).getPayload();
    }

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(PASS_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private boolean isTokenExpired(String jwtToken) {
        Date expirationDate = extractClaim(jwtToken, Claims::getExpiration);
        return expirationDate.before(new Date());
    }
    
}
