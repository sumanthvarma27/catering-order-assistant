import { Router, Request, Response } from 'express';
import { handleChatMessage, checkDetailsComplete } from '../services/chatService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    console.log('💬 Received', messages.length, 'messages');

    // Get AI response
    const aiResponse = await handleChatMessage(messages);

    // Check if all required details have been collected
    const detailsStatus = checkDetailsComplete(messages);

    console.log('📦 Response:', {
      messageLength: aiResponse.message.length,
      detailsComplete: detailsStatus.complete,
      menuItemsCount: detailsStatus.menuItems?.length || 0
    });

    res.json({
      message: aiResponse.message,
      detailsComplete: detailsStatus.complete,
      menuItems: detailsStatus.complete ? detailsStatus.menuItems : undefined,
    });
  } catch (error) {
    console.error('❌ Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      message: 'Sorry, I encountered an error. Please try again.'
    });
  }
});

export default router;