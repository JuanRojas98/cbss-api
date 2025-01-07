CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (500) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(500) NOT NULL,
    active int(5) NOT NULL DEFAULT 1,
    created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password)
VALUES ('Juan Rojas', 'juanca.rojas.9810@gmail.com', '123456789');

CREATE TABLE tables(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    active int(5) NOT NULL DEFAULT 1
)