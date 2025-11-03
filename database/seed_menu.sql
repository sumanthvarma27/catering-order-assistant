-- ========================
-- SEED MENU DATA
-- ========================

-- Veg Appetizers
INSERT INTO menu_items (category_id, name, is_available) VALUES
(1, 'Onion Samosa', true),
(1, 'Paneer 65', true),
(1, 'Gobi Manchurian', true),
(1, 'Paneer Tikka', true),
(1, 'Chilli Gobi', true);

-- Non-Veg Appetizers
INSERT INTO menu_items (category_id, name, is_available) VALUES
(2, 'Chicken 65', true),
(2, 'Chicken Lollipop', true),
(2, 'Chicken Tikka', true),
(2, 'Mutton Pepper Fry', true),
(2, 'Goat Ghee Roast', true);

-- Veg Entrees
INSERT INTO menu_items (category_id, name, is_available) VALUES
(3, 'Paneer Butter Masala', true),
(3, 'Dal Fry', true),
(3, 'Malai Kofta', true),
(3, 'Channa Masala', true),
(3, 'Palak Paneer', true);

-- Non-Veg Entrees
INSERT INTO menu_items (category_id, name, is_available) VALUES
(4, 'Butter Chicken', true),
(4, 'Chicken Curry with Bone', true),
(4, 'Goat Curry', true),
(4, 'Gongura Chicken', true),
(4, 'Chicken Chettinad', true);

-- Veg Fried Rice
INSERT INTO menu_items (category_id, name, is_available) VALUES
(5, 'Bejawada Veg Fried Rice', true),
(5, 'Gongura Paneer Fried Rice', true);

-- Non-Veg Fried Rice
INSERT INTO menu_items (category_id, name, is_available) VALUES
(6, 'Bejawada Chicken Fried Rice', true),
(6, 'Bejawada Goat Fried Rice', true);

-- Veg Biryanis
INSERT INTO menu_items (category_id, name, is_available) VALUES
(7, 'Veg Dum Biryani', true),
(7, 'Paneer Biryani', true),
(7, 'Gongura Paneer Biryani', true);

-- Non-Veg Biryanis
INSERT INTO menu_items (category_id, name, is_available) VALUES
(8, 'Chicken Dum Biryani', true),
(8, 'Goat Dum Biryani', true),
(8, 'Ulavacharu Chicken Biryani', true);

-- Pulaos
INSERT INTO menu_items (category_id, name, is_available) VALUES
(9, 'Paneer Pulao', true),
(9, 'Chicken Fry Pulao', true),
(9, 'Raju Gari Goat Pulao', true);

-- Desserts
INSERT INTO menu_items (category_id, name, is_available) VALUES
(10, 'Double Ka Meeta', true),
(10, 'Rasmalai', true),
(10, 'Gulab Jamun', true);

-- Breads
INSERT INTO menu_items (category_id, name, is_available) VALUES
(11, 'Plain Naan & Roti', true),
(11, 'Butter Naan & Roti', true),
(11, 'Garlic Naan', true),
(11, 'Mango Lassi', true),
(11, 'Chikoo Shake', true);


-- ========================
-- PRICING BASED ON CATEGORY + SIZE
-- ========================

-- Tray-based items
INSERT INTO item_pricing (menu_item_id, tray_size_id, price)
SELECT 
    m.id,
    t.id,
    CASE
        WHEN m.category_id IN (1,2) THEN  -- Appetizers
            CASE
                WHEN t.size_name = 'Small' THEN 100
                WHEN t.size_name = 'Medium' THEN 160
                WHEN t.size_name = 'Large' THEN 180
            END
        WHEN m.category_id IN (3,4) THEN  -- Entrees
            CASE
                WHEN t.size_name = 'Small' THEN 85
                WHEN t.size_name = 'Medium' THEN 140
                WHEN t.size_name = 'Large' THEN 160
            END
        WHEN m.category_id IN (5,6,7,8,9) THEN  -- Rice/Biryani/Pulao
            CASE
                WHEN t.size_name = 'Small' THEN 100
                WHEN t.size_name = 'Medium' THEN 160
                WHEN t.size_name = 'Large' THEN 180
            END
        WHEN m.category_id = 10 THEN  -- Desserts
            CASE
                WHEN t.size_name = 'Small' THEN 90
                WHEN t.size_name = 'Medium' THEN 130
                WHEN t.size_name = 'Large' THEN 170
            END
        ELSE 0
    END AS price
FROM menu_items m
JOIN tray_sizes t ON m.category_id IN (1,2,3,4,5,6,7,8,9,10);

-- Non-tray items (Breads, Beverages)
INSERT INTO item_pricing (menu_item_id, tray_size_id, price)
SELECT 
    m.id,
    t.id,
    CASE
        WHEN m.name = 'Plain Naan & Roti' THEN 2.5
        WHEN m.name = 'Butter Naan & Roti' THEN 3.0
        WHEN m.name = 'Garlic Naan' THEN 3.5
        WHEN m.name = 'Mango Lassi' THEN 45
        WHEN m.name = 'Chikoo Shake' THEN 65
        ELSE 0
    END
FROM menu_items m
CROSS JOIN (SELECT id FROM tray_sizes LIMIT 1) t  -- only one size applied
WHERE m.category_id = 11;  -- Breads category
