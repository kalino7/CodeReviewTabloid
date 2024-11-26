package com.springtest.springerapp.domain.config;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.springtest.springerapp.domain.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
       @NonNull HttpServletRequest request, 
       @NonNull HttpServletResponse response, 
       @NonNull FilterChain filterChain) throws ServletException, IOException {

        // service class to get userdetails
        
        // get the header and make sure you can return the jwt token from the authorization header.
        final String authHeader = request.getHeader("Authorization");
        
        if(authHeader == null || !authHeader.startsWith("Bearer "))
        {
            // means no token was entered or passed; skip to the next request in the filter chain
            filterChain.doFilter(request, response);
            return;
        }

        // start from the positon with the token itself: Bearer isdoisdsndusndsodsodsdsioso
        final String jwtToken = authHeader.substring(7);

        // extract username from the derived token
        String authUsername = jwtService.extractUsername(jwtToken);

        if(authUsername != null && SecurityContextHolder.getContext().getAuthentication() == null)
        {
            //means username is not null and has not yet been authenticated
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(authUsername);
            
            if(jwtService.isTokenValid(jwtToken, userDetails))
            {
                // update securitycontext with authtoken code for this request
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        //call next request
        filterChain.doFilter(request, response);

    }

}
