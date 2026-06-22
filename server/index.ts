import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { handleContact } from './contactHandler';

const app = express();
app.use(helmet());
app.use(express.json({ limit: '20kb' }));
app.use('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false }));
app.post('/api/contact', async (request, response) => { try { const result = await handleContact(request.body); response.status(result.status).json(result.body); } catch (error) { console.error('Contact delivery failed', error); response.status(502).json({ ok: false, error: 'Delivery failed' }); } });
app.get('/api/health', (_request, response) => response.json({ ok: true }));
app.listen(Number(process.env.PORT || 8787), () => console.log(`Contact API listening on :${process.env.PORT || 8787}`));
