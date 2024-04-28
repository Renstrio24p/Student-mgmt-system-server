import express, { Router, Request, Response } from 'express';
import { Expression } from 'mongoose';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// Dynamic Image or Files Upload

export const uploads = Router();

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, './src/uploads/'); 
  },
  filename: function (_req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const hash = crypto.createHash('md5').update(file.originalname).digest('hex');
    cb(null, hash + fileExtension); 
  },
});

const upload = multer({ storage: storage });

uploads.post('/upload', async(req: Request, res: Response): Promise<Expression> => {
  const type = req.query.type; 
  if (type !== 'image' && type !== 'file') {
    return res.status(400).send('Invalid file type specified.');
  }
  upload.single(type)(req, res, (err: any): Expression => {
    if (err) {
      return res.status(400).send('Error uploading file.');
    }
    const fileUrl = `${req.protocol}://${req.get('host')}/api/upload/${type}/${req.file!.filename}`;
    res.send(`File uploaded successfully. File URL: ${fileUrl}, Hashed Filename: ${req.file!.filename}`);
  });
});

uploads.use('/upload/image', express.static(path.join(__dirname, '..', 'uploads')));
uploads.use('/upload/file', express.static(path.join(__dirname, '..', 'uploads')));

uploads.get('/upload/image/:filename', (req: Request, res: Response) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '..', 'uploads', filename); 
  res.sendFile(imagePath);
});

uploads.get('/upload/file/:filename', (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '..', 'uploads', filename); 
  res.sendFile(filePath);
});

export default uploads;
