#!/bin/bash
echo "Setting up before app runs..."
./mvnw flyway:migrate
