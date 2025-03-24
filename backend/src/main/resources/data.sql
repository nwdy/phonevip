INSERT INTO users (name, username, password, email) VALUES
    ('Nguyen Van A', 'user1', '$2a$12$JD3u4hzacca0u0i2fbdFGOqcczJk5rjiyba5tiUHzXFtNotbFrhTu', 'user1_pw_123456@example.com'),
    ('Nguyen Van B', 'user2', '$2a$12$Z4DpAosxp15SMX5Bu3z5GejVfkKyOCA4lULYclHZ8pDM7IKvoqdga', 'user2_pw_12345678@example.com');

INSERT INTO roles (name, description) VALUES
    ('USER', 'Customers who buy products'),
    ('ADMIN', 'People who sell products');

INSERT INTO user_roles (user_id, role_name) VALUES
    (1, 'USER'),
    (1, 'ADMIN'),
    (2, 'USER');

INSERT INTO products (name, price, image_url, description, stock, manufacturer, ram, storage, color, rating, created_at, updated_at) VALUES
-- 01-05
    ('Samsung Galaxy S25 5G 12GB/256GB', 19990000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 100, 'Samsung', 12, 256, 'white', 4.8, '2025-03-01 10:50:24', '2025-03-01 10:50:24'),
    ('Samsung Galaxy S25 Ultra 5G 12GB/256GB', 30990000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 150, 'Samsung', 12, 256, 'black', 4.7, '2025-03-01 11:00:00', '2025-03-01 11:00:00'),
    ('Samsung Galaxy S24 Ultra 5G 12GB/256GB', 25990000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 200, 'Samsung', 12, 256, 'blue', 5, '2025-03-02 09:30:15', '2025-03-02 09:30:15'),
    ('Samsung Galaxy A16 5G 8GB/256GB', 6490000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 200, 'Samsung', 8, 256, 'red', 5, '2025-03-02 10:10:25', '2025-03-02 10:10:25'),
    ('Samsung Galaxy Z Fold6 5G 12GB/256GB', 37090000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 80, 'Samsung', 12, 256, 'green', 5, '2025-03-02 11:15:35', '2025-03-02 11:15:35'),
-- 06-10
    ('Samsung Galaxy A06 4GB/64GB', 2890000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 100, 'Samsung', 4, 64, 'white', 4.9, '2025-03-01 10:50:24', '2025-03-01 10:50:24'),
    ('Samsung Galaxy A35 5G 8GB/256GB', 8090000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 150, 'Samsung', 8, 256, 'black', 4.8, '2025-03-01 11:00:00', '2025-03-01 11:00:00'),
    ('Samsung Galaxy A05s 6GB/128GB', 3690000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 200, 'Samsung', 6, 128, 'blue', 5, '2025-03-02 09:30:15', '2025-03-02 09:30:15'),
    ('Samsung Galaxy S24 FE 5G 8GB/256GB', 18490000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 200, 'Samsung', 8, 256, 'red', 5, '2025-03-02 10:10:25', '2025-03-02 10:10:25'),
    ('Samsung Galaxy A25 5G 8GB/128GB', 6190000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 80, 'Samsung', 8, 128, 'green', 4.6, '2025-03-02 11:15:35', '2025-03-02 11:15:35'),
-- 11-15
    ('Samsung Galaxy S24 5G 8GB/256GB', 17990000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 100, 'Samsung', 8, 256, 'white', 4.7, '2025-03-01 10:50:24', '2025-03-01 10:50:24'),
    ('Samsung Galaxy S24+ 5G 12GB/256GB', 18990000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 150, 'Samsung', 12, 256, 'black', 5, '2025-03-01 11:00:00', '2025-03-01 11:00:00'),
    ('Samsung Galaxy A55 5G 12GB/256GB', 10890000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 200, 'Samsung', 12, 256, 'blue', 4.7, '2025-03-02 09:30:15', '2025-03-02 09:30:15'),
    ('Samsung Galaxy M35 5G 8GB/256GB', 7990000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 200, 'Samsung', 8, 256, 'red', 4.5, '2025-03-02 10:10:25', '2025-03-02 10:10:25'),
    ('Samsung Galaxy M15 5G 6GB/128GB', 4490000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 80, 'Samsung', 6, 128, 'green', 4.6, '2025-03-02 11:15:35', '2025-03-02 11:15:35'),
-- 16-20
    ('Samsung Galaxy A16 8GB/128GB', 5390000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 100, 'Samsung', 8, 128, 'white', 4.7, '2025-03-01 10:50:24', '2025-03-01 10:50:24'),
    ('Samsung Galaxy Z Flip6 5G 12GB/256GB', 21350000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 150, 'Samsung', 12, 256, 'black', 4.6, '2025-03-01 11:00:00', '2025-03-01 11:00:00'),
    ('Samsung Galaxy S25 Plus 5G 12GB/256GB', 23990000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 200, 'Samsung', 12, 256, 'blue', 5, '2025-03-02 09:30:15', '2025-03-02 09:30:15'),
    ('Samsung Galaxy S25 5G 12GB/512GB', 23490000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 200, 'Samsung', 12, 512, 'red', 4.8, '2025-03-02 10:10:25', '2025-03-02 10:10:25'),
    ('Samsung Galaxy S25 Ultra 5G 12GB/512GB', 34450000, 'product.png', 'Mô tả chi tiết (bổ sung sau)', 80, 'Samsung', 12, 512, 'green', 4.9, '2025-03-02 11:15:35', '2025-03-02 11:15:35');

INSERT INTO carts (user_id) VALUES
    (2);

INSERT INTO cart_items (quantity, product_id, updated_at, cart_id, selected) VALUES
    (1, 1, '2025-03-03 09:30:15', 1, true),
    (2, 2, '2025-03-03 09:32:00', 1, true);

INSERT INTO orders (total_price, created_at, updated_at, user_id, status) VALUES
    (38000000, '2025-03-03 09:34:10', '2025-03-03 09:34:10', 2, 'COMPLETED');

INSERT INTO order_items (order_id, product_id, quantity) VALUES
    (1, 1, 1),
    (1, 2, 2);
