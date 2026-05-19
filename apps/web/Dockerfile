FROM node:22-alpine AS base
WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/web/package.json apps/web/package.json
RUN corepack enable && pnpm install --frozen-lockfile=false
COPY . .
WORKDIR /app/apps/web
RUN pnpm build
CMD ["pnpm", "start"]
