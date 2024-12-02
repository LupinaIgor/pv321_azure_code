import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_ACCOUNT_KEY, AZURE_STORAGE_AVATAR_BASKET } from '../../config/index.js';

/**
 * Загружает файл в Azure Storage.
 * @param {Object} file - Объект файла из запроса.
 * @returns {Promise<Object>} - Объект с информацией о загруженном файле.
 */
export const uploadToAzure = async (file) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blobServiceClient = new BlobServiceClient(
                `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
                new StorageSharedKeyCredential(AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_ACCOUNT_KEY)
            );

            const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_AVATAR_BASKET);

            // Создаем контейнер, если его еще нет
            if (!(await containerClient.exists())) {
                await containerClient.create();
                console.log(`Контейнер "${AZURE_STORAGE_AVATAR_BASKET}" создан`);
            }

            const blobName = `${Date.now()}-${file.name}`; // Уникальное имя файла
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            // Загружаем данные
            await blockBlobClient.uploadData(file.data, {
                blobHTTPHeaders: { blobContentType: file.mimetype },
            });

            resolve({
                name: blobName,
                url: blockBlobClient.url,
            });
        } catch (err) {
            console.error('Ошибка загрузки файла в Azure:', err.message);
            reject(new Error(`Ошибка загрузки файла в Azure: ${err.message}`));
        }
    });
};