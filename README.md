# ZAPIER 

### Turborepo App 

### Link

Still working on it


### Zapier-Like Project

Welcome to Zapier – a comprehensive side project that aims to replicate the functionalities of Zapier while offering unique, customizable workflows. This project integrates various services and components, providing end-to-end automation and integration for a wide range of tasks.

## Overview

Zapieris built to enable seamless automation by connecting different applications and services through workflows. From simple task automation to complex multi-step processes, this project provides a robust solution for connecting services using a microservices architecture.

## Tech Stack

Frontend: Next.js
Backend: Node.js
Database: PostgreSQL
Messaging Queue: Kafka from docker
Docker
Project Structure
All components of the project are integrated within a single repository:

## Folder Structure

- **Frontend**: The user interface of Zapflow.
- **Primary BE**: Handles all Create, Read, Update, and Delete (CRUD) operations.
- **Sweeper**: Produces messages and sends operations to a queue for processing.
- **Worker**: Consumes messages from the queue and processes them.
- **Hooks**: Manages incoming webhooks, triggering ZapRuns and coordinating subsequent operations.


## Features

Automated Workflows: Create, manage, and execute workflows connecting various apps and services.
Real-time Messaging: Use Kafka to manage event-driven communication between services.
End-to-End Integration: From frontend to backend, database, and queue-based processing.
Scalable Microservices: Efficient handling of large volumes of tasks using distributed services.
Monitoring and Analytics: Tracking and managing workflows with insights.
