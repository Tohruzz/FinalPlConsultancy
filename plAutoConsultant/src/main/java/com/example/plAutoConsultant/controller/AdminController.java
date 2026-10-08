package com.example.plAutoConsultant.controller;

import com.example.plAutoConsultant.model.Admin;
import com.example.plAutoConsultant.service.AdminService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(
        origins = "http://127.0.0.1:5500",
        allowCredentials = "true"
)
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }


    @PostMapping("/add")
    public Admin addAdmin(@RequestBody Admin admin) {

        return adminService.addAdmin(admin);
    }


    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> loginData,
                        HttpSession session) {

        String username =
                loginData.get("username");

        String password =
                loginData.get("password");


        boolean result =
                adminService.login(username, password);


        if(result){

            session.setAttribute(
                    "admin",
                    username
            );

            return "Login successful";
        }


        return "Invalid username or password";
    }


    @GetMapping("/check")
    public String checkLogin(HttpSession session) {

        Object admin =
                session.getAttribute("admin");


        if(admin != null){

            return "Logged in";
        }


        return "Not logged in";
    }
}