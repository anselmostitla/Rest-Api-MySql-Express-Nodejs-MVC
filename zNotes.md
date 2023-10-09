1.  --> npm init -y
2.  --> mkdir config  models middlewares routes controllers helpers
3.  --> touch index.js .env .gitignore .env.example Dockerfile .dockerignore
4.  --> npm i express dotenv 
    --> npm i mysql2 mongoose
    --> npm i bcrypt body-parser  
    --> npm i nodemon --save-dev

Add to scripts
5. --> "dev": "nodemon index.js",
   --> "start": "node index.js"npm

To connect to mongodb
6. --> npm i mongodb

7. Add the extension "Mongo Snippets for Node-js"

8. To ecmac script in the package.json add the folowing:
--> "type": "module"

9. install csvtojson
--> npm i csvtojson

10. npm i mathjs 



### To connect to mysql
0 https://youtu.be/BOhky4ExTN4?si=rtSE3ijqjKGDNmkk
1 open mysql workbench
2 click on the circular wraped "+" sign in the "MySQL connections" 
  In this example I have already created one with the name "five_connection", open it and once inside it
  click on the + cilindrical icon database to create a schema 
  on name as an example I put "six_db" then apply apply finish
  open "six_db" and right click on "table", then "create table"
  please define the variables for this table

### Insert Multiple Records
--> https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp#:~:text=Node.js%20MySQL%20Insert%20Into%201%20Insert%20Into%20Table,is%20returned.%20...%204%20Get%20Inserted%20ID%20

### Nodejs MySQL REST API, Desde cero a Despliegue en Railway
https://youtu.be/3dSkc-DIM74?si=1oLP_cMV0oBrGrV1


