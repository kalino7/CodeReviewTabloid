package com.springtest.springerapp.domain.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
@ConfigurationProperties(prefix="security.jwt")
public class SecurityProperties {
    //maps to encryption-key in .yml file
    private String encryptionKey;
}
