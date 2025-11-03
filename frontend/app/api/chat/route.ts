import { NextResponse } from 'next/server';

// For testing without OpenAI - gives predetermined responses
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;
    
    // Get the last user message
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    
    let responseMessage = '';
    
    // Simple response logic based on keywords
    if (lastUserMessage.includes('menu')) {
      responseMessage = `We offer a wide variety of authentic Indian dishes:

🍛 APPETIZERS: Chicken 65, Paneer Tikka, Samosas
🍲 ENTREES: Butter Chicken, Paneer Butter Masala, Goat Curry
🍚 BIRYANI: Chicken Dum Biryani, Veg Biryani, Goat Biryani
🍞 BREADS: Naan, Garlic Naan, Roti

What type of event are you planning?`;
    } else if (lastUserMessage.includes('price') || lastUserMessage.includes('cost')) {
      responseMessage = `Our catering prices depend on tray size:
      
- Half Tray (serves 5-8): Starting at $75
- Medium Tray (serves 10-15): Starting at $110  
- Large Tray (serves 15-25): Starting at $140

How many guests will you be serving?`;
    } else if (lastUserMessage.match(/\d+\s*(people|guests)/)) {
      const match = lastUserMessage.match(/(\d+)/);
      const guests = match ? parseInt(match[1]) : 50;
      
      responseMessage = `For ${guests} guests, I recommend:
      
- 2 Large trays of Appetizers (Chicken 65 + Paneer Tikka)
- 3 Large trays of Entrees (Butter Chicken, Paneer Masala, Dal)
- 2 Large trays of Biryani
- Naan bread for all guests
- 1 Large tray of dessert

This would cost approximately $${guests * 15}. Would you like to customize this order?`;
    } else {
      responseMessage = `Welcome to Royal Biryani House Catering! 

I can help you plan the perfect order for your event. To get started, could you tell me:

1. How many guests will you be serving?
2. What type of event is this?
3. Do you have any dietary preferences (vegetarian, etc.)?
4. When do you need the catering?`;
    }
    
    return NextResponse.json({
      message: responseMessage,
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { message: 'I apologize for the error. Please try again or call us at (555) 123-4567.' },
      { status: 200 }
    );
  }
}
