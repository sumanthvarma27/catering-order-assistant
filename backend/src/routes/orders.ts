import { Router } from 'express';
import { db } from '../server';

const router = Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT * FROM orders 
      ORDER BY created_at DESC
      LIMIT 100
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Update order status
router.patch('/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    const query = `
      UPDATE orders 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    
    const result = await db.query(query, [status, orderId]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Create new order
router.post('/', async (req, res) => {
  const client = await db.connect();
  
  try {
    await client.query('BEGIN');
    
    const {
      customerName, customerEmail, customerPhone,
      eventDate, eventTime, adults, kids,
      items, deliveryNeeded, deliveryAddress,
      specialInstructions, subtotal, totalAmount
    } = req.body;
    
    const orderNumber = 'CAT' + Date.now().toString().slice(-10);
    
    const orderQuery = `
      INSERT INTO orders (
        order_number, customer_name, customer_email, customer_phone,
        event_date, event_time, guest_count_adults, guest_count_kids,
        delivery_needed, delivery_address, subtotal, total_amount,
        special_instructions, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'pending')
      RETURNING *
    `;
    
    const orderValues = [
      orderNumber, customerName, customerEmail, customerPhone,
      eventDate, eventTime, adults, kids || 0,
      deliveryNeeded, deliveryAddress, subtotal, totalAmount,
      specialInstructions
    ];
    
    const orderResult = await client.query(orderQuery, orderValues);
    const order = orderResult.rows[0];
    
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (
          order_id, menu_item_id, tray_size_id, 
          quantity, unit_price, total_price
        ) VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.id, item.menuItemId, item.traySizeId, 
         item.quantity, item.unitPrice, item.totalPrice]
      );
    }
    
    await client.query('COMMIT');
    res.json({ success: true, order });
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  } finally {
    client.release();
  }
});

export default router;
