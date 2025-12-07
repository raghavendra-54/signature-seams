# =========================
# 1) Build stage (with Maven)
# =========================
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy Maven config and source code
COPY pom.xml .
COPY src ./src

# Build Spring Boot jar (tests skipped for faster build)
RUN mvn -DskipTests clean package

# =========================
# 2) Run stage (only JRE)
# =========================
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the built jar from the first stage
COPY --from=build /app/target/*.jar app.jar

# Expose Spring Boot port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
