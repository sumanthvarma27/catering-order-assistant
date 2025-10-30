-- Menu Categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0
);

-- Menu Items
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(id),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    is_available BOOLEAN DEFAULT true,
    is_special_menu BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tray Sizes
CREATE TABLE tray_sizes (
    id SERIAL PRIMARY KEY,
    size_name VARCHAR(50) NOT NULL, -- 'Small', 'Medium', 'Large', 'X-Large'
    serves_adults INT NOT NULL,
    serves_kids INT NOT NULL
);

-- Pricing
CREATE TABLE item_pricing (
    id SERIAL PRIMARY KEY,
    menu_item_id INT REFERENCES menu_items(id),
    tray_size_id INT REFERENCES tray_sizes(id),
    price DECIMAL(10, 2) NOT NULL,
    UNIQUE(menu_item_id, tray_size_id)
);

-- Orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(20) UNIQUE NOT NULL,
    customer_name VARCHAR(200) NOT NULL,
    customer_email VARCHAR(200) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    guest_count_adults INT NOT NULL,
    guest_count_kids INT DEFAULT 0,
    delivery_needed BOOLEAN DEFAULT false,
    delivery_address TEXT,
    delivery_distance_miles DECIMAL(5, 2),
    delivery_fee DECIMAL(10, 2),
    subtotal DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    special_instructions TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    menu_item_id INT REFERENCES menu_items(id),
    tray_size_id INT REFERENCES tray_sizes(id),
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);

-- Chat Sessions
CREATE TABLE chat_sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100) UNIQUE NOT NULL,
    order_id INT REFERENCES orders(id),
    conversation_data JSONB,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Feedback
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data
INSERT INTO categories (name, display_order) VALUES
('Appetizers', 1),
('Curry/Entrees', 2),
('Rice Items', 3),
('Naans', 4),
('Desserts', 5);

INSERT INTO tray_sizes (size_name, serves_adults, serves_kids) VALUES
('Small', 5, 8),
('Medium', 10, 15),
('Large', 15, 22),
('X-Large', 20, 30);