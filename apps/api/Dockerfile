FROM node:22-alpine AS base
WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/security/package.json packages/security/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN corepack enable && pnpm install --frozen-lockfile=false
COPY . .
RUN pnpm --filter @secure-attendance/api prisma:generate && pnpm --filter @secure-attendance/contracts build && pnpm --filter @secure-attendance/security build && pnpm --filter @secure-attendance/api build
WORKDIR /app/apps/api
CMD ["sh", "-c", "pnpm prisma:migrate:deploy && pnpm start"]
