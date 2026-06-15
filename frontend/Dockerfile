# ==========================

# STAGE 1 - DEPENDENCIES

# ==========================

FROM node:22-bookworm-slim AS deps

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json* ./

RUN --mount=type=cache,target=/root/.npm npm ci

# ==========================

# STAGE 2 - BUILD

# ==========================

FROM node:22-bookworm-slim AS builder

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ==========================

# STAGE 3 - RUNTIME

# ==========================

FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

LABEL org.opencontainers.image.title="project-frontend"
LABEL org.opencontainers.image.description="Next.js Frontend"
LABEL org.opencontainers.image.version="1.0.0"

RUN groupadd --system nodejs && useradd --system --gid nodejs nextjs

RUN mkdir -p ./public && chown nextjs:nodejs ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
