import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('sessions')
  createSession(@Body() body: Record<string, unknown>) {
    return this.attendanceService.createSession(body);
  }

  @Get('sessions/latest')
  getLatest(@Query('teacherId') teacherId?: string) {
    return this.attendanceService.getLatestSession(teacherId);
  }

  @Post('scan')
  scan(@Body() body: Record<string, unknown>) {
    return this.attendanceService.validateScan(body);
  }

  @Post('sessions/:sessionId/lock')
  lock(@Param('sessionId') sessionId: string) {
    return this.attendanceService.lockSession(sessionId);
  }

  @Get('sessions/:sessionId')
  getSession(@Param('sessionId') sessionId: string) {
    return this.attendanceService.getSession(sessionId);
  }

  @Get('sessions/:sessionId/records')
  getRecords(@Param('sessionId') sessionId: string) {
    return this.attendanceService.listRecords(sessionId);
  }
}
