"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: { origin: true, credentials: true } });
    app.use((0, helmet_1.default)());
    app.setGlobalPrefix('api/v1');
    app.getHttpAdapter().get('/', (_request, response) => {
        response.status(200).json({
            name: 'Secure Attendance API',
            status: 'ok',
            message: 'API is running. Use /api/v1 for application routes.',
            routes: ['/api/v1/auth', '/api/v1/attendance', '/api/v1/analytics', '/api/v1/notifications'],
        });
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true, forbidUnknownValues: true }));
    const port = Number(process.env['PORT'] ?? 4000);
    await app.listen(port);
}
void bootstrap();
