import path from 'path';
import fs from 'fs';
import { UPLOAD_DIR } from '../../config/index.js'; // Папка для загрузки из config

// Создаем папку для загрузок, если ее еще нет
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

/**
 * Загружает файл в локальное хранилище.
 * @param {Object} file - Объект файла из запроса.
 * @returns {Promise<Object>} - Объект с информацией о загруженном файле.
 */
export const uploadToLocal = (file) => {
    return new Promise((resolve, reject) => {
        try {
            const uploadPath = path.join(UPLOAD_DIR, `${Date.now()}-${file.name}`); // Формируем путь для сохранения

            // Сохраняем файл в локальной директории
            file.mv(uploadPath, (err) => {
                if (err) {
                    console.error('Ошибка при сохранении файла:', err);
                    return reject(new Error(`Ошибка при сохранении файла: ${err.message}`));
                }

                resolve({
                    originalname: file.name,
                    size: file.size,
                    mimetype: file.mimetype,
                    path: uploadPath,
                    url: uploadPath,//?
                });
            });
        } catch (err) {
            console.error('Ошибка загрузки файла в локальное хранилище:', err);
            reject(new Error(`Ошибка загрузки файла в локальное хранилище: ${err.message}`));
        }
    });
};