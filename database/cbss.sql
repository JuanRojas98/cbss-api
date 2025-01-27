# TABLA DE USUARIOS
CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (500) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(500) NOT NULL,
    active int(5) NOT NULL DEFAULT 1,
    created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

# INSERT INTO users (name, email, password)
# VALUES ('Juan Rojas', 'juanca.rojas.9810@gmail.com', '123456789');

# TABLA DE MESAS
CREATE TABLE tables(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    active int(5) NOT NULL DEFAULT 1
);

INSERT INTO tables(name, active)
VALUES ('Mesa 1', 1),
       ('Mesa 2', 1),
       ('Mesa 3', 1),
       ('Mesa 4', 1),
       ('Mesa 5', 1),
       ('Mesa 6', 1),
       ('Mesa 7', 1),
       ('Mesa 8', 1),
       ('Mesa 9', 1),
       ('Mesa 10', 1),
       ('Mesa 11', 1),
       ('Mesa 12', 1),
       ('Mesa 13', 1),
       ('Mesa 14', 1),
       ('Mesa 15', 1),
       ('Mesa 16', 1),
       ('Mesa 17', 1),
       ('Mesa 18', 1);

# TABLA DE CATEGORIAS
CREATE TABLE categories(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    status INT(5) NOT NULL DEFAULT 1
);

# TABLA DE MARCAS
CREATE TABLE brands(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    status INT(5) NOT NULL DEFAULT 1
);

# TABLA DE PRODUCTOS
CREATE TABLE products(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    description VARCHAR(500) DEFAULT NULL,
    category_id INT NOT NULL,
    brand_id INT NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

alter table products
modify brand_id int null;

# TABLA DE MOVIMIENTOS
CREATE TABLE movements(
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    movement_type INT NOT NULL,
    quantity INT NOT NULL,
    sale_id INT DEFAULT NULL,
    created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

# TABLA DE TURNOS
CREATE TABLE shifts(
    id INT PRIMARY KEY AUTO_INCREMENT,
    startDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    endDate datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

# TABLA DE TIPO DE ESTADOS
CREATE TABLE states_type(
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(200) NOT NULL
);

INSERT INTO states_type(type)
VALUES ('Productos'),
   ('Ventas');

# TABLA DE ESTADOS
CREATE TABLE states(
    id INT PRIMARY KEY AUTO_INCREMENT,
    state VARCHAR(200) NOT NULL,
    state_type INT NOT NULL
);

INSERT INTO states(state, state_type)
VALUES ('Pendiente por cobrar', 2),
   ('Anulada', 2),
   ('Cerrada y cobrada', 2),
   ('Cerrada y pendiente por cobrar', 2);

# TABLA DE VENTAS
CREATE TABLE sales(
    id INT PRIMARY KEY AUTO_INCREMENT,
    shift_id INT DEFAULT NULL,
    table_id INT DEFAULT NULL,
    user_id INT NOT NULL,
    state_id INT NOT NULL,
    created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

# TABLA DE PRODUCTOS VENTAS
CREATE TABLE sales_items(
    sales_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL
);

TRUNCATE TABLE products;
TRUNCATE TABLE movements;
TRUNCATE TABLE sales;
TRUNCATE TABLE sales_items;
TRUNCATE TABLE shifts;

SELECT
    s.id,
    s.shift_id,
    s.table_id,
    (
        SELECT
            CAST( SUM( si.quantity * p.price ) AS UNSIGNED )
        FROM sales_items si
            LEFT JOIN products p ON si.product_id = p.id
        WHERE si.sales_id = s.id
    ) AS total_value,
    s.user_id,
    st.state,
    s.created,
    s.updated
FROM sales s
     LEFT JOIN states st ON s.state_id = st.id
WHERE s.id = 1;

SELECT
    i.product_id,
    p.name,
    i.quantity
FROM sales_items i
    LEFT JOIN sales s ON i.sales_id = s.id
    LEFT JOIN products p on i.product_id = p.id
WHERE s.id = 1;

SELECT
    t.id,
    t.name,
    CASE
        WHEN ( SELECT COUNT(*) FROM sales s WHERE s.table_id = t.id ) > 0 THEN 0
        ELSE 1
    END AS available
FROM tables t
WHERE t.active = 1

SELECT p.id,
       p.name,
       p.description,
       p.category_id,
       c.name AS category_name,
       p.quantity,
       (
           SELECT
               CASE
                  WHEN SUM(si.quantity) IS NULL THEN 0
                  ELSE SUM(si.quantity)
               END
           FROM sales_items si
           WHERE si.product_id = p.id
       ) AS quantity_sold,
       p.price,
       p.created
FROM products p
         LEFT JOIN categories c ON c.id = p.category_id
