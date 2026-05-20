import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NotificationType } from '@prisma/client';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  list(@Query('userId') userId: string) {
    return this.notificationsService.list(userId);
  }

  @Post()
  create(@Body() body: { userId: string; type: NotificationType; title: string; message: string }) {
    return this.notificationsService.create(body);
  }
}
