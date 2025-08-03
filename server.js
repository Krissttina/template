const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from the root route!');
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ fileUrl });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use(express.static('index.html'));