DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
ALTER TABLE products DROP CONSTRAINT IF EXISTS fk_category_id;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS role CASCADE;
DROP TYPE IF EXISTS order_status CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS stores CASCADE;
DROP TABLE IF EXISTS colors CASCADE;
