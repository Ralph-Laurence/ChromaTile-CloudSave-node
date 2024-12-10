const path      = require('path');
const fs        = require('fs');
const rootDir   = require('../root_path');

const download = (req, res) => {
    const userId = req.UserID; // Assumes UserID is in the headers

    if (!userId) {
        return res.status(400).send('User ID missing from headers');
    }

    const filePath = path.join(rootDir, 'uploads', 'save', userId, 'user.sav');

    if (fs.existsSync(filePath))
    {
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename=user.sav');

        fs.createReadStream(filePath).pipe(res).on('error', (err) => {
            console.error('Error sending file:', err);
            res.status(500).send('Error downloading file');
        });
    }
    else
    {
        res.status(404).send('File not found');
    }
};

module.exports = download;
