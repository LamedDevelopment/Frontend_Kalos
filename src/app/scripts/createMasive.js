const fs = require('fs');
const path = require('path');

// Directorio base del proyecto
const baseDir = './src/app';

// Función para crear una carpeta
const createFolder = (folderPath) => {
  fs.mkdirSync(folderPath);
};

// Crear la estructura de carpetas y archivos
const createProjectStructure = () => {
  const folders = [
    { name: 'auth', includeModule: true },
    { name: 'shared', includeModule: true },
    { name: 'pages', includeModule: true },
    { name: 'core', includeModule: false }
  ];

  const subfolders = [
    'class',
    'helpers',
    'models',
    'pipes',
    'services',
    'components'
  ];

  folders.forEach((folder) => {
    const folderPath = path.join(baseDir, folder.name);
    createFolder(folderPath);

    subfolders.forEach((subfolder) => {
      const subfolderPath = path.join(folderPath, subfolder);
      createFolder(subfolderPath);

      if (subfolder === 'components') {
        createFolder(path.join(subfolderPath, 'components'));
      }
    });
  });
};

// Ejecutar la función para crear la estructura del proyecto
createProjectStructure();
