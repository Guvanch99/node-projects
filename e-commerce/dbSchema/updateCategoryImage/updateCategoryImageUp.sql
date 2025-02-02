CREATE TABLE category_images(
id SERIAL,
image_url TEXT NOT NUll,
category_id INT,
CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
)
