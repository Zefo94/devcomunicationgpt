
# DevCommunicationGPT

DevCommunicationGPT es un sistema de gestión de tickets que permite a los clientes comunicarse con agentes de servicio a través de WhatsApp. Los mensajes de los clientes se distribuyen automáticamente a los agentes disponibles.

## Características

- Creación y gestión de usuarios
- Autenticación de usuarios con JWT
- Gestión de tickets (crear, leer, actualizar, eliminar)
- Integración con WhatsApp utilizando venom-bot
- Asignación automática de tickets a agentes disponibles

## Instalación

1. Clona el repositorio:

   \`\`\`bash
   git clone https://github.com/Zefo94/devcomunicationgpt.git
   cd devcomunicationgpt/backend
   \`\`\`

2. Instala las dependencias:

   \`\`\`bash
   npm install
   \`\`\`

3. Configura las variables de entorno:

   Crea un archivo .env en el directorio raíz del backend y añade las siguientes variables:

   \`\`\`env
   JWT_SECRET=your_jwt_secret
   \`\`\`

4. Ejecuta las migraciones de la base de datos:

   \`\`\`bash
   npx sequelize-cli db:migrate
   \`\`\`

5. Inicia el servidor:

   \`\`\`bash
   node app.js
   \`\`\`

## Uso

- **Registro de Usuario**: Envia una solicitud POST a \`/api/users/register\` con el siguiente cuerpo:
  \`\`\`json
  {
    "username": "testuser",
    "password": "testpassword",
    "role": "agent"
  }
  \`\`\`

- **Inicio de Sesión**: Envia una solicitud POST a \`/api/users/login\` con el siguiente cuerpo:
  \`\`\`json
  {
    "username": "testuser",
    "password": "testpassword"
  }
  \`\`\`

- **Crear un Ticket**: Envia una solicitud POST a \`/api/tickets\` con el siguiente cuerpo y el token JWT en la cabecera Authorization:
  \`\`\`json
  {
    "title": "Test Ticket",
    "description": "This is a test ticket",
    "status": "open",
    "assignedTo": 1
  }
  \`\`\`

## Configuración de Git y .gitignore

### Revertir un \`git add .\`

Si accidentalmente has agregado todos los archivos al índice con \`git add .\` antes de configurar \`.gitignore\`, puedes revertir esta acción con el siguiente comando:

\`\`\`bash
git reset
\`\`\`

### Crear y Configurar \`.gitignore\`

1. **Crear el archivo \`.gitignore\`**:

   \`\`\`bash
   touch .gitignore
   \`\`\`

2. **Añadir las siguientes reglas al archivo \`.gitignore\`**:

   \`\`\`plaintext
   # Node modules
   node_modules/
   
   # Logs
   logs/
   *.log
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*
   
   # Environment variables
   .env
   
   # MacOS files
   .DS_Store
   
   # npm
   package-lock.json
   yarn.lock
   
   # Editor directories and files
   .idea/
   .vscode/
   *.swp
   
   # Venom Bot session files
   session/
   \`\`\`

3. **Agregar y confirmar el archivo \`.gitignore\`**:

   \`\`\`bash
   git add .gitignore
   git commit -m "Add .gitignore file"
   \`\`\`

### Agregar y Confirmar Cambios

1. **Agregar y confirmar el archivo \`README.md\`**:

   \`\`\`bash
   git add README.md
   git commit -m "Add README.md file with project documentation"
   \`\`\`

2. **Agregar y confirmar todos los archivos restantes**:

   \`\`\`bash
   git add .
   git commit -m "Complete backend functionality for ticket management and WhatsApp integration"
   \`\`\`

3. **Empujar los cambios al repositorio remoto**:

   \`\`\`bash
   git push origin develop
   \`\`\`

## Contribuir

Si deseas contribuir a este proyecto, por favor, abre un pull request o crea un issue en el repositorio.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
