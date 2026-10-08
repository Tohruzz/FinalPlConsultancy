package com.example.plAutoConsultant.service;

import com.example.plAutoConsultant.model.Admin;
import com.example.plAutoConsultant.repository.AdminRepo;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepo adminRepo;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public AdminService(AdminRepo adminRepo) {
        this.adminRepo = adminRepo;
    }

    public Admin addAdmin(Admin admin) {

        admin.setPassword(
                passwordEncoder.encode(admin.getPassword())
        );

        return adminRepo.save(admin);
    }

    public boolean login(String username, String password) {

        Admin admin =
                adminRepo.findByUsername(username).orElse(null);

        if(admin == null){
            return false;
        }

        return passwordEncoder.matches(
                password,
                admin.getPassword()
        );
    }
}