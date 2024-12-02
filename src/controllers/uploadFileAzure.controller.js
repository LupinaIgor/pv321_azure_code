import {uploadToAzure} from "../services/files/uploadToAzure.js";

export const uploadFileAzureController = async (req, res) => {

    // Проверяем, есть ли файл в запросе
    if (!req.files || !req.files.avatar) {
        return res.status(400).json({ error: 'Файл не загружен' });
    }

    const file = req.files.avatar; // Получаем файл из запроса


    try {
        // Загружаем файл через модуль
        const uploadedFile = await uploadToAzure(file);

        res.json({
            message: 'Файл успешно загружен в Azure Storage',
            file: uploadedFile,
        });
    } catch (err) {
        res.status(500).json({
            error: 'Ошибка загрузки файла в Azure Storage',
            details: err.message,
        });
    }


};

// // import {UPLOAD_DIR} from "../config/index.js";
// // import fs from 'fs';
// // import e from "express";
// //
// // //Создаем папку для загрузок, если ее нет
// // if (!fs.existsSync(UPLOAD_DIR)){
// //     fs.mkdirSync(UPLOAD_DIR,{recursive:true});
// // }
//
// import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
// import { AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_ACCOUNT_KEY, AZURE_STORAGE_AVATAR_BASKET } from '../config/index.js';
//
// export const uploadFileAzureController = async (req, res) => {
//
//     console.log('Start Upload file to Azure controller')
//     // Проверяем, есть ли файл в запросе
//     if (!req.files || !req.files.avatar) {
//         return res.status(400).json({ error: 'Файл не загружен' });
//     }
//
//     const file = req.files.avatar; // Получаем файл из запроса
//     // const uploadPath = `${UPLOAD_DIR}/${Date.now()}-${file.name}`;
//     //
//     // //Сохраняем файл
//     // file.mv(uploadPath, (err) => {
//     //     if (err) {
//     //         console.error(err)
//     //         return res.status(500).json({error: 'Ошибка при сохранении файла', details:err.message || err })
//     //     }
//     //     //Успешній ответ
//     //     res.json({
//     //         message: 'Файл успешно загружен',
//     //         file:{
//     //             originalname: file.name,
//     //             size: file.size,
//     //             mimetype: file.mimetype,
//     //             path: uploadPath,
//     //         },
//     //     });
//     // });
//     try {
//         const blobServiceClient = new BlobServiceClient(
//             `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
//             new StorageSharedKeyCredential(AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_ACCOUNT_KEY)
//         );
//
//         const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_AVATAR_BASKET);
//
//         // Создаем контейнер, если его еще нет
//         if (!(await containerClient.exists())) {
//             await containerClient.create();
//             console.log(`Контейнер "${AZURE_STORAGE_AVATAR_BASKET}" создан`);
//         }
//
//         const blobName = `${Date.now()}-${file.name}`; // Уникальное имя файла
//         const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//
//         // Загружаем данные
//         await blockBlobClient.uploadData(file.data, {
//             blobHTTPHeaders: { blobContentType: file.mimetype },
//         });
//
//         // resolve({
//         //     name: blobName,
//         //     url: blockBlobClient.url,
//         // });
//
//         res.json({
//             message:'Файл успешно загружен в Azure Storage',
//             file: {
//                 name: blobName,
//                 url: blockBlobClient.url,
//             },
//         });
//
//
//     } catch (err) {
//         console.error('Ошибка загрузки файла в Azure:', err.message);
//         //reject(new Error(`Ошибка загрузки файла в Azure: ${err.message}`));
//         res.status(500).json({ error:'Ошибка загрузки файла в Azure', details: err.message});
//     }
// };