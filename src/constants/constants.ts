import * as dotenv from 'dotenv';
dotenv.config();

export const PORT_NAME = Number(process.env.PORT_NAME) | 4000;
