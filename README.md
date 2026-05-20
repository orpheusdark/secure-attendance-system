# Secure Attendance System

An enterprise-grade anti-fraud attendance platform using rolling QR codes, geolocation validation, biometric verification, and real-time fraud detection for educational institutions and training organizations.

## 🎯 Features

- **Anti-Fraud Attendance**: Rolling QR tokens, location validation, and liveness checks
- **Real-time Monitoring**: Live attendance streams with fraud alerts
- **Multi-role Dashboard**: Interfaces for students, teachers, and admins
- **Biometric Verification**: Device fingerprinting and authentication
- **Comprehensive Audit Logs**: Full compliance with institutional policies
- **WebSocket Updates**: Live notifications and session monitoring

## 🏗️ Project Structure

```
├── apps/api       - NestJS backend API
├── apps/web       - Next.js web dashboard
├── apps/mobile    - Expo React Native app
├── packages/      - Shared contracts, security, UI
├── infra/         - Docker Compose services
└── docs/          - Architecture documentation
```

## 🚀 Quick Start

### Prerequisites
- **Node.js**: 18+
- **pnpm**: 9.15.4
- **Docker & Docker Compose**
- **Expo Go**: For mobile testing

### 1. Install Dependencies
```bash
npx pnpm@9.15.4 install
```

### 2. Start Infrastructure
```bash
npm run infra:up
```

### 3. Run Migrations & Seed
```bash
pnpm --filter @secure-attendance/api run prisma:migrate:deploy
npm run api:seed
```

**Demo Credentials:**
- Email: `teacher@nexus.edu`
- Password: `Password123!`

### 4. Start Services (3 terminals)

**Terminal 1 - API:**
```bash
pnpm --filter @secure-attendance/api run dev
```
API: http://localhost:4000

**Terminal 2 - Web:**
```bash
pnpm --filter @secure-attendance/web run dev
```
Web: http://localhost:3000

**Terminal 3 - Mobile:**
```bash
pnpm --filter @secure-attendance/mobile run start
```

### Mobile on Physical Device
```bash
cd apps/mobile
$env:EXPO_PUBLIC_API_URL='http://YOUR_LAN_IP:4000/api/v1'
pnpm start -- --clear
```

## 📱 Mobile Features

- **Health Check**: Verifies API connectivity before login
- **QR Scanner**: Real-time rolling QR code scanning
- **Dashboard**: Personal attendance metrics and streaks
- **Settings**: Biometric unlock, device trust, API URL config
- **Notifications**: Real-time alerts and reminders
- **Teacher Monitor**: Session management and live tracking

## 🌐 Web Dashboard

Use the sidebar to navigate between roles:
- **Overview**: Enterprise fraud metrics
- **Teacher**: Create sessions, manage QR, monitor fraud
- **Student**: View attendance, streaks, and warnings
- **Admin**: Institution operations, audit logs, compliance
