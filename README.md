En progreso una vez lista podras:

Dogs APP


En esta aplicación podrás ver distintas razas de perros junto con los detalles de las mismas utilizando la api externa the dog api y a partir de ella poder, entre otras cosas:




Buscar razas de perros


Filtrarlos / Ordenarlos


Agregar nuevas razas




- Detalle de raza



detalle_perrito



- Crear una raza



create_dog




Comenzando 🚀


Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.



IMPORTANTE: Para poder utilizar esta API es necesario crear una cuenta para obtener una API Key que deberá ser incluida en el archivo .env



El archivo .env (carpeta api) debe tener la siguiente forma:



DB_USER=usuariodepostgres


DB_PASSWORD=passwordDePostgres


DB_HOST=localhost


API_KEY=tu API key


DB_NAME=dogs


PORT=3001


Adicionalmente será necesario que crees desde psql una base de datos llamada dogs



Instalación 🔧


Clona el repo


git clone https://github.com/memm1991/DogsApp.git


Instala los paquetes


npm install


Inicia tanto el back (carpeta api), como el front (carpeta client)


npm start


Construido con 🛠️


 React
 
 
 Redux
 
 
 Express
 
 
 Sequelize - Postgres
 
 
Licencia 📄


Este proyecto fue creado con fines educativos, no tiene fines de lucro - sientete libre de usarlo

