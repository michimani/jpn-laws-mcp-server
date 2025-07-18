# ============================================================================
# Base stage
# ============================================================================
FROM oven/bun:1.2.15@sha256:8b5e8d3b6a734ae438c7c6f1bdc23e54eb9c35a0e2e3099ea2ca0ef781aca23b AS base
WORKDIR /usr/src/app

# ============================================================================
# Install dependencies stage
# ============================================================================
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install production dependencies
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# ============================================================================
# Build stage
# ============================================================================
FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build

# ============================================================================
# Release stage
# ============================================================================
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json .

# Run as non-root user
USER bun

# Run the MCP server
ENTRYPOINT ["bun", "run", "dist/index.js"]
