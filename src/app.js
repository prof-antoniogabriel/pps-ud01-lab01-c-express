import express from 'express';
import noticeRoutes from './routes/noticeRoutes.js';
import { settings } from './config/settings.js';

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));
app.get('/health', (req, res) => res.json({ status: 'ok', application: settings.appName }));
app.use('/api/notices', noticeRoutes);
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

export default app;
