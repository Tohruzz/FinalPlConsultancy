package com.example.plAutoConsultant.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(cors -> {})

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/vehicles/**",
                                "/api/images/**",
                                "/api/enquiries/**",
                                "/api/sellReq/**",
                                "/uploads/**"
                        ).permitAll()
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}