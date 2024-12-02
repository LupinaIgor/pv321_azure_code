import dotenv from 'dotenv';
dotenv.config();
export const SERVER_NAME = process.env.SERVER_NAME || "Azure Express";
export const SERVER_HOST = process.env.SERVER_HOST || "0.0.0.0";
export const SERVER_PORT = process.env.SERVER_PORT || 3000;


/**
 * Объявление переменных для Azure Storage
 */
export const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME || 'pv321storage';//Имя учетной записи в Azure Storage (по умолчанию pv321).
export const AZURE_STORAGE_ACCOUNT_KEY = process.env.AZURE_STORAGE_ACCOUNT_KEY || null;//Ключ доступа к учетной записи. По умолчанию null (значит, он должен быть обязательно задан в process.env).
export const AZURE_STORAGE_AVATAR_BASKET = process.env.AZURE_STORAGE_AVATAR_BASKET || 'avatars';//Имя контейнера (аналог папки) для хранения аватаров в Azure Storage. По умолчанию avatars.


/**
 * Настройка пути к временной папке загрузки
 */
//1. Импорты модулей
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const UPLOAD_DIR = path.resolve(__dirname, '../uploads');