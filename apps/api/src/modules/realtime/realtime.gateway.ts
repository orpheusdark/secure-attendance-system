import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import type { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: true, credentials: true } })
export class RealtimeGateway {
  private readonly logger = new Logger(RealtimeGateway.name);

  @WebSocketServer()
  server!: Server;

  emitAttendanceUpdate(payload: unknown) {
    this.logger.debug('broadcast attendance update');
    this.server?.emit('attendance:update', payload);
  }

  emitFraudAlert(payload: unknown) {
    this.server?.emit('fraud:alert', payload);
  }
}
