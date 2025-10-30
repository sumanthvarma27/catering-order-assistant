-- Insert sample menu items
INSERT INTO menu_items (category_id, name, description, is_available) VALUES
-- Appetizers (category_id = 1)
(1, 'Vegetable Samosas', 'Crispy pastries filled with spiced vegetables', true),
(1, 'Chicken Tikka', 'Marinated chicken pieces grilled to perfection', true),
(1, 'Paneer Pakoras', 'Cottage cheese fritters with mint chutney', true),
(1, 'Spring Rolls', 'Crispy rolls with vegetable filling', true),

-- Entrees (category_id = 2)
(2, 'Butter Chicken', 'Tender chicken in creamy tomato sauce', true),
(2, 'Palak Paneer', 'Cottage cheese in spinach gravy', true),
(2, 'Chicken Biryani', 'Fragrant rice with spiced chicken', true),
(2, 'Dal Makhani', 'Creamy black lentils slow-cooked overnight', true),
(2, 'Lamb Curry', 'Tender lamb in aromatic curry sauce', true),

-- Rice Items (category_id = 3)
(3, 'Vegetable Biryani', 'Fragrant basmati rice with mixed vegetables', true),
(3, 'Jeera Rice', 'Cumin flavored basmati rice', true),
(3, 'Chicken Fried Rice', 'Wok-fried rice with chicken and vegetables', true),

-- Naans (category_id = 4)
(4, 'Garlic Naan', 'Bread topped with garlic and cilantro', true),
(4, 'Plain Naan', 'Traditional Indian bread', true),
(4, 'Butter Naan', 'Naan brushed with butter', true),

-- Desserts (category_id = 5)
(5, 'Gulab Jamun', 'Sweet milk dumplings in sugar syrup', true),
(5, 'Rasmalai', 'Cottage cheese dumplings in sweetened milk', true),
(5, 'Kheer', 'Rice pudding with cardamom and nuts', true);

-- Insert sample pricing for each item (all tray sizes)
INSERT INTO item_pricing (menu_item_id, tray_size_id, price)
SELECT 
    m.id,
    t.id,
    CASE 
        WHEN t.size_name = 'Small' THEN 
            CASE 
                WHEN m.category_id = 1 THEN 35  -- Appetizers
                WHEN m.category_id = 2 THEN 45  -- Entrees
                WHEN m.category_id = 3 THEN 30  -- Rice
                WHEN m.category_id = 4 THEN 25  -- Naans
                WHEN m.category_id = 5 THEN 30  -- Desserts
            END
        WHEN t.size_name = 'Medium' THEN 
            CASE 
                WHEN m.category_id = 1 THEN 65
                WHEN m.category_id = 2 THEN 85
                WHEN m.category_id = 3 THEN 55
                WHEN m.category_id = 4 THEN 45
                WHEN m.category_id = 5 THEN 55
            END
        WHEN t.size_name = 'Large' THEN 
            CASE 
                WHEN m.category_id = 1 THEN 95
                WHEN m.category_id = 2 THEN 125
                WHEN m.category_id = 3 THEN 80
                WHEN m.category_id = 4 THEN 65
                WHEN m.category_id = 5 THEN 80
            END
        WHEN t.size_name = 'X-Large' THEN 
            CASE 
                WHEN m.category_id = 1 THEN 125
                WHEN m.category_id = 2 THEN 165
                WHEN m.category_id = 3 THEN 105
                WHEN m.category_id = 4 THEN 85
                WHEN m.category_id = 5 THEN 105
            END
    END
FROM menu_items m
CROSS JOIN tray_sizes t;
