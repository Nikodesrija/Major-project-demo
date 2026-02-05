package com.example.logistics.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.logistics.entity.DriverBehavior;


@Repository
public interface DriverBehaviorRepository
        extends JpaRepository<DriverBehavior, Integer> {

    List<DriverBehavior> findByFlaggedTrue();
}
