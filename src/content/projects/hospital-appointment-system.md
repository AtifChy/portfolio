---
title: "Hospital Appointment System"
tagline: "Layered Healthcare Management System with ASP.NET Core & SQL Server"
description: "A web-based hospital appointment management system built with ASP.NET Core MVC, Entity Framework Core, and SQL Server for managing patients, doctors, appointments, and hospital operations."
featured: false
order: 6
category: "Fullstack Web"
role: "Fullstack Developer"
period: "2024"
stack:
  - "C#"
  - ".NET 10"
  - "ASP.NET Core MVC"
  - "Entity Framework Core"
  - "SQL Server"
  - "AutoMapper"
  - "BCrypt"
  - "Docker"
githubUrl: "https://github.com/AtifChy/HospitalAppointmentSystem"
stats:
  "Framework": "ASP.NET Core MVC (.NET 10)"
  "Database": "Microsoft SQL Server"
  "ORM": "Entity Framework Core"
  "Security": "BCrypt & Layered RBAC"
keyHighlights:
  - "Engineered layered architecture separating Presentation (MVC), Business Logic (Services), and Data Access (EF Core Repositories)."
  - "Built comprehensive workflows for patient registration, doctor schedules, and appointment reservation with conflict checks."
  - "Integrated AutoMapper for type-safe Data Transfer Object (DTO) and ViewModel transformations."
  - "Secured user credentials and sensitive medical records using BCrypt hashing and role-based access control."
  - "Containerized the entire stack with Docker for reproducible deployment across development and production environments."
---

## Overview

The **Hospital Appointment System** is a web-based management platform built to streamline clinical scheduling, doctor shifts, patient intake, and hospital administrative operations.

## Architecture & Capabilities

- **Layered Architecture**: Decouples UI controllers from business rules and database persistence using the Repository and Service patterns.
- **Appointment Scheduling**: Enforces business logic to prevent doctor schedule overlaps, double-booking, and booking during hospital off-hours.
- **Role-Based Authentication**: Granular permission boundaries separating Patients, Doctors, and Hospital Administrators.
- **Data Persistence**: Backed by Microsoft SQL Server with Entity Framework Core handling migrations, relationships, and ACID transaction safety.
- **Docker Support**: Container configuration enabling one-command local orchestration with SQL Server.
