# Proyecto 0 de la clase Desarrollo de Soluciones Cloud

Para el desarrollo del back-end y el front-end, se utilizaron las herramientas de Node.js y React respectivamente. En cuanto a la base de datos, se montó una base de datos PostgreSQL local en la máquina virtual. Por lo tanto, una vez se clone el proyecto, se deberán realizar las siguientes instrucciones:  
1. Para desplegar el servicio back:  
```
cd back-end
npm install
node app.js
```  
2. Para desplegar el servicio front se debe utilizar el proxy de la Universidad de los Andes en caso de que se despliegue el servicio directamente desde el servidor predeterminado:  
```
cd front
npm install
npm start
```  
3. Para el acceso a la base de datos, se debe especificar las credenciales del usuario de la base de datos, al igual que el host y el puerto respectivo en el archivo `back-end/data/appsettings.json`  
Además, la documentación de la API expuesta se encuentra en el siguiente link: https://web.postman.co/collections/11389962-c8785cd5-8b5b-4989-a7c4-a5bb78043141?version=latest&workspace=445e802c-152b-4294-8057-fdf0ddbe2e67  
Por último, en el siguiente video se evidencia el uso de la aplicación web corriendo desde el servidor predeterminado de la máquina virtual: https://www.youtube.com/watch?v=arKinlNLSxg
