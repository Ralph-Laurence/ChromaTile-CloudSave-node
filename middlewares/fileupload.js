const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const rootDir = require('../root_path');

// Function to rename the file asynchronously
// const renameFile = (oldPath, newPath) => {
//     return new Promise((resolve, reject) => {
//         fs.rename(oldPath, newPath, (err) => {
//             if (err) {
//                 reject(`Error renaming file: ${err}`);
//             } else {
//                 resolve('File renamed successfully');
//             }
//         });
//     });
// };

// const upload = (req, res) => {
//     const form = new formidable.IncomingForm();
//     const userId = req.UserID;

//     if (!userId) {
//         return res.status(400).send('User ID missing from headers');
//     }

//     // Ensure the upload directory exists
//     const uploadDir = path.join(rootDir, 'uploads', 'save', userId);
//     if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     // Set the upload directory
//     form.uploadDir = uploadDir;

//     form.parse(req, async (err, fields, files) => {
//         if (err) {
//             console.error(`Error during upload: ${err}`);
//             return res.status(500).send('File upload failed');
//         }

//         // Assuming the field name is 'file'
//         const oldPath = files.file[0].filepath;

//         const newPath = path.join(uploadDir, 'user.sav');

//         try {
//             // Check if the old path exists before renaming
//             if (fs.existsSync(oldPath)) {
//                 // Rename the file after it's fully uploaded
//                 await renameFile(oldPath, newPath);
//                 console.log('File renamed successfully');
//                 res.status(200).send('Save progress loaded successfully');
//             } else {
//                 console.error('Old file path does not exist.');
//                 res.status(500).send('File upload failed');
//             }
//         } catch (err) {
//             console.error(err);
//             return res.status(500).send('File rename failed');
//         }
//     });

//     form.on('error', (err) => {
//         console.error(`Error during upload: ${err}`);
//         res.status(500).send('File upload failed');
//     });
// };




const upload = (req, res) => {

    const userId = req.UserID;

    if (!userId) {
        return res.status(400).send('User ID missing from headers');
    }

    // Ensure the upload directory exists
    const uploadDir = path.join(rootDir, 'uploads', 'save', userId);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, 'user.sav');

    // Write the raw binary data from the request body to the file
    const fileStream = fs.createWriteStream(filePath);

    req.on('data', (chunk) => {
        fileStream.write(chunk);  // Write data chunks to the file
    });

    req.on('end', () => {
        fileStream.end();
        console.log('File upload complete.');
        res.status(200).send('File uploaded successfully');
    });

    req.on('error', (err) => {
        console.error('Upload error:', err);
        res.status(500).send('File upload failed');
    });
};

module.exports = upload;
