import {uploadFile} from "../services/files/upload.service.js";


export const uploadFileController = async (req, res) => {

    // Проверяем, есть ли файл в запросе
    if (!req.files || !req.files.avatar) {
        return res.status(400).json({ error: 'Файл не загружен' });
    }

    const file = req.files.avatar; // Получаем файл из запроса

    uploadFile(file)
        .then(uploadedFile => {
            res.json({
                message: 'Файл успешно загружен',
                file: uploadedFile,
            });
        })
        .catch(err => {
            res.status(500).json({
                error: 'Ошибка загрузки файла',
                details: err.message,
            });
        })
};



// //import {uploadToLocal} from "../services/files/uploadToLocal.js";
// import {uploadFile} from "../services/files/upload.service.js";
// export const uploadFileLocalController = async (req, res) => {
//
//     // Проверяем, есть ли файл в запросе
//     if (!req.files || !req.files.avatar) {
//         return res.status(400).json({ error: 'Файл не загружен' });
//     }
//
//     const file = req.files.avatar; // Получаем файл из запроса
//
//     try {
//         // Загружаем файл через модуль
//         const uploadedFile = await uploadToLocal(file);
//
//         res.json({
//             message: 'Файл успешно загружен в локальное хранилище',
//             file: uploadedFile,
//         });
//     } catch (err) {
//         res.status(500).json({
//             error: 'Ошибка загрузки файла в локальное хранилище',
//             details: err.message,
//         });
//     }
//
// };


// import {UPLOAD_DIR} from "../config/index.js";
// import fs from 'fs';
// import e from "express";
//
// //Создаем папку для загрузок, если ее нет
// if (!fs.existsSync(UPLOAD_DIR)){
//     fs.mkdirSync(UPLOAD_DIR,{recursive:true});
// }
//
// export const uploadFileController = async (req, res) => {
//
//     console.log('Start file controller')
//     // Проверяем, есть ли файл в запросе
//     if (!req.files || !req.files.avatar) {
//         return res.status(400).json({ error: 'Файл не загружен' });
//     }
//
//     const file = req.files.avatar; // Получаем файл из запроса
//     const uploadPath = `${UPLOAD_DIR}/${Date.now()}-${file.name}`;
//
//     //Сохраняем файл
//     file.mv(uploadPath, (err) => {
//         if (err) {
//             console.error(err)
//             return res.status(500).json({error: 'Ошибка при сохранении файла', details:err.message || err })
//         }
//         //Успешній ответ
//         res.json({
//             message: 'Файл успешно загружен',
//             file:{
//                 originalname: file.name,
//                 size: file.size,
//                 mimetype: file.mimetype,
//                 path: uploadPath,
//             },
//         });
//     });
// };