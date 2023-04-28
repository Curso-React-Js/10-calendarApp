# CalendarApp

## Development steps

1. Renombrar el archivo .env.template por .env
2. Hacer los cambios respectivos en las variables de entorno.

```
VITE_API_URL=http://localhost:4000/api
```

## Instalaciones para testing con npm en vite + react

- npm install jest babel-jest @babel/preset-env @babel/preset-react --save-dev
- npm install @testing-library/react @types/jest jest-environment-jsdom --save-dev
- npm install whatwg-fetch --save-dev

3. Actualizar los scripts del __package.json__
```
"scripts: {
  ...
  "test": "jest --watchAll"
}
```

3.1 Eliminar en __package.json__ 
```
"type": "module"
```

4. Crear la configuración de babel __babel.config.js__
```
module.exports = {
    presets: [
        [ '@babel/preset-env', { targets: { esmodules: true } } ],
        [ '@babel/preset-react', { runtime: 'automatic' } ],
    ],
};
```

5. Para componentes que importen CSS, crear un archivo llamado:
```tests/mocks/styleMock.js```
```
module.exports = {};
```

6. Opcional, pero eventualmente necesario, crear Jest config y setup:

__jest.config.js__
```
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [],
  
  // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
  moduleNameMapper: {
      '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
  },
}
```

__jest.setup.js__
```
// En caso de necesitar la implementación del FetchAPI
// yarn add -D whatwg-fetch
// import 'whatwg-fetch'; 

// En caso de encontrar paquetes que lo requieran 
// yarn add -D setimmediate
// import 'setimmediate';

// En caso de tener variables de entorno y aún no soporta el import.meta.env
// yarn add -D dotenv
// require('dotenv').config({
//     path: '.env.test'
// });

// Realizar el mock completo de las variables de entorno
// jest.mock('./src/helpers/getEnvVariables', () => ({
//     getEnvVariables: () => ({ ...process.env })
// }));
```