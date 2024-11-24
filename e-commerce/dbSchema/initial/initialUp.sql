CREATE TYPE role AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username varchar(500) NOT NULL,
  email varchar(500) NOT NULL UNIQUE,
  password varchar(500) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  role role DEFAULT 'USER'
);

CREATE TABLE refresh_tokens(
	id SERIAL PRIMARY KEY,
	token TEXT NOT NULL,
	expires_at TIMESTAMPTZ NOT NULL,
	user_id INTEGER UNIQUE,
	CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE categories(
	id SERIAL PRIMARY KEY,
	name VARCHAR(400) NOT NULL,
	parent_category int,
	CONSTRAINT fk_parent_category FOREIGN KEY(parent_category) REFERENCES categories(id)
);

CREATE TABLE orders(
	id SERIAL PRIMARY KEY,
	user_id int NOT NULL,
	CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id),
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE products(
	id SERIAL PRIMARY KEY,
	name VARCHAR(400) NOT NULL,
	description TEXT NOT NULL,
	price NUMERIC(10, 2) NOT NULL,
	discount NUMERIC(10, 2) DEFAULT 0,
	count integer,
	category_id int,
	CONSTRAINT fk_category_id FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INT,
    image_url TEXT NOT NULL,
    CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products (id)
);


CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    product_id INT NOT NULL,
    CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,
    isLike BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

CREATE TABLE addresses(
	id SERIAL PRIMARY KEY,
	order_id int NOT NULL UNIQUE,
	CONSTRAINT fk_order_id FOREIGN KEY(order_id) REFERENCES orders(id),
	city varchar(400) NOT NULL,
	street varchar(400) NOT NULL
);

CREATE TABLE reviews(
	id serial PRIMARY KEY,
	rating int CHECK(rating IS NULL OR rating BETWEEN 1 AND 5),
	review_text text,
	user_id int,
	CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id),
	product_id int,
	CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES products(id),
	UNIQUE(user_id, product_id)
);



CREATE TABLE order_items(
	id SERIAL PRIMARY KEY,
	price  NUMERIC(10, 2),
	quantity int,
	product_id int NOT NULL,
	CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES products(id),
	order_id int NOT NULL,
	CONSTRAINT fk_order_id FOREIGN KEY(order_id) REFERENCES orders(id),
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
