package com.example.logistics.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.logistics.entity.DriverBehavior;
import com.example.logistics.repository.DriverBehaviorRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final DriverBehaviorRepository repository;

    public AdminController(DriverBehaviorRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/flagged-drivers")
    public List<DriverBehavior> getFlaggedDrivers() {
        return repository.findByFlaggedTrue();
    }

    // OPTIONAL test route
    @GetMapping("/test")
    public String test() {
        return "Admin API working";
    }
}
