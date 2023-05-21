import { Server } from 'socket.io';

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway(3001)
export class ChoicesGateway {
  @WebSocketServer()
  server: Server;
  emitMessage(payload: any) {
    this.server.sockets.emit('question.choice.saved', payload);
  }
}
