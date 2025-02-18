# railway-management

# Features
# used jwt token for secure registration and login
# search for availability of train between two stations
# Admin has authorization to manage train , update seats via asmin privileges


#Tech stack
backend : Node.js, express.js
database:Mysql
Authenication:JWT

# Installation 
#git clone https://github.com/your-username/railway-management-system.git
cd railway-management-system
# Dependencies
#npm install express mysql2 bcryptjs jsonwebtoken dotenv cors body-parser   
#Configure .env file 
PORT=5000
DB_HOST=your-mysql-host
DB_USER=your-mysql-username
DB_PASSWORD=your-mysql-password
DB_NAME=railway_db
JWT_SECRET=your-secret-key
ADMIN_API_KEY=your-admin-api-key

#setup My sql Database

CREATE DATABASE railway_db;
USE railway_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);

CREATE TABLE trains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    train_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (train_id) REFERENCES trains(id)
);

#run the server 
node server.js




