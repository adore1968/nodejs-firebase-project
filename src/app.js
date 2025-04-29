import express from 'express';
import dotenv from 'dotenv';
import contactsRoutes from './routes/contacts.routes.js';

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.use('/api/contacts', contactsRoutes);

export default app;
