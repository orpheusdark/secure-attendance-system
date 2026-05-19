import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { FraudModule } from './modules/fraud/fraud.module';
import { RealtimeModule } from './modules/realtime/realtime.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    AttendanceModule,
    AnalyticsModule,
    FraudModule,
    NotificationsModule,
    RealtimeModule,
  ],
})
export class AppModule {}
