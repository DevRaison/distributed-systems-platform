# ==========================================
# STAGE 1: MULTI-MODULE BUILD
# ==========================================
FROM maven:3.9.11-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy Maven descriptors first so dependency resolution can be cached
# independently from application source code changes.
COPY pom.xml .
COPY api/pom.xml ./api/
COPY application/pom.xml ./application/
COPY bootstrap/pom.xml ./bootstrap/
COPY domain/pom.xml ./domain/
COPY infrastructure/pom.xml ./infrastructure/
COPY shared/pom.xml ./shared/

# Copy module sources after POMs to preserve Docker layer cache efficiency.
COPY api/src ./api/src
COPY application/src ./application/src
COPY bootstrap/src ./bootstrap/src
COPY domain/src ./domain/src
COPY infrastructure/src ./infrastructure/src
COPY shared/src ./shared/src

# Build the complete Maven Reactor and reuse the local dependency cache
# across container builds when BuildKit is enabled.
RUN --mount=type=cache,target=/root/.m2 \
    mvn -B clean install -DskipTests

# ==========================================
# STAGE 2: DISTROLESS RUNTIME
# ==========================================
FROM gcr.io/distroless/java21-debian12:nonroot

WORKDIR /app

LABEL org.opencontainers.image.title="project-backend"
LABEL org.opencontainers.image.description="Spring Boot Modular Backend"
LABEL org.opencontainers.image.version="1.0.0"

# The bootstrap module produces the executable Spring Boot fat JAR that
# assembles all application modules and runtime dependencies.
COPY --from=builder /app/bootstrap/target/bootstrap-1.0.0.jar /app/app.jar

EXPOSE 8080

# Configure JVM behavior for containerized workloads while keeping memory
# usage bounded relative to the container limits.
ENV JAVA_TOOL_OPTIONS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+UseZGC -Djava.security.egd=file:/dev/urandom"

# Run without root privileges to reduce the impact of a potential compromise.
USER nonroot:nonroot

ENTRYPOINT ["java", "-jar", "/app/app.jar"]