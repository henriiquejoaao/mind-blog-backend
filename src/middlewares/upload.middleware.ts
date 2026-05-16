import multer from "multer"; // biblioteca usada para lidar com upload de arquivos
import path from "path"; // módulo nativo do Node usado para trabalhar com caminhos de arquivos

// configuração de como e onde os arquivos enviados serão salvos
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "uploads"); // define a pasta onde os arquivos serão salvos
  },

  filename: (request, file, callback) => {
    const fileExtension = path.extname(file.originalname); // pega a extensão original do arquivo
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExtension}`; // gera um nome único para evitar sobrescrever arquivos

    callback(null, fileName);
  }
});

// configuração do multer para usar o armazenamento definido acima
const upload = multer({
  storage
});

export { upload };