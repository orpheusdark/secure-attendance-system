var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
let AttendanceController = class AttendanceController {
    attendanceService;
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    createSession(body) {
        return this.attendanceService.createSession(body);
    }
    getLatest(teacherId) {
        return this.attendanceService.getLatestSession(teacherId);
    }
    scan(body) {
        return this.attendanceService.validateScan(body);
    }
    lock(sessionId) {
        return this.attendanceService.lockSession(sessionId);
    }
    getSession(sessionId) {
        return this.attendanceService.getSession(sessionId);
    }
    getRecords(sessionId) {
        return this.attendanceService.listRecords(sessionId);
    }
};
__decorate([
    Post('sessions'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "createSession", null);
__decorate([
    Get('sessions/latest'),
    __param(0, Query('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getLatest", null);
__decorate([
    Post('scan'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "scan", null);
__decorate([
    Post('sessions/:sessionId/lock'),
    __param(0, Param('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "lock", null);
__decorate([
    Get('sessions/:sessionId'),
    __param(0, Param('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getSession", null);
__decorate([
    Get('sessions/:sessionId/records'),
    __param(0, Param('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getRecords", null);
AttendanceController = __decorate([
    Controller('attendance'),
    __metadata("design:paramtypes", [AttendanceService])
], AttendanceController);
export { AttendanceController };
