import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  list(@Query('userId') userId: string) {
    return this.notificationsService.list(userId);
  }

  @Post()
  create(@Body() body: { userId: string; type: string; title: string; message: string }) {
    return this.notificationsService.create(body);
  }
}
