import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import mkdirp from 'mkdirp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, '..', 'public', 'uploads');

mkdirp.sync(uploadDir);

const upload = multer({
    dest: uploadDir,
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
        destination: uploadDir,
    }),

    fileFilter: (req, file, cb) => {
        // Aquí puedes agregar la lógica para filtrar los archivos
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Tipo de archivo no permitido'), false);
        }
        cb(null, true);
    },
    
});

export default upload;