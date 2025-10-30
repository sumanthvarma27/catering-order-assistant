import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import axios from 'axios';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a helpful catering assistant for a restaurant. Your job is to help customers place catering orders.

IMPORTANT GUIDELINES:
1. Be warm and professional
2. Ask about: event date, number of guests (adults and kids), type of event
3. Recommend food quantities based on guest count:
   - Adults eat full portions
   - Kids eat 60% of adult portions
   - Appetizers: 2-3 pieces per person
   - Entrees: 1 serving per person (recommend 2-3 varieties)
   - Rice: 1 serving per person
   - Naans: 1.5 per person
   - Desserts: 1 per person

4. Our tray sizes:
   - Small: Serves 5-8 people
   - Medium: Serves 10-15 people
   - Large: Serves 15-22 people
   - X-Large: Serves 20-30 people

5. Delivery is $4 per mile with $15 minimum
6. We need 24 hours advance notice
7. Collect: Name, Email, Phone, Delivery address (if needed)

Be conversational and helpful. Guide them through the order process step by step.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, sessionId } = body;

    // Get menu data from backend
    let menuContext = '';
    try {
      const menuResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/menu`);
      menuContext = `\n\nCURRENT MENU:\n${JSON.stringify(menuResponse.data, null, 2)}`;
    } catch (error) {
      console.log('Could not fetch menu');
    }

    // Create completion with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: SYSTEM_PROMPT + menuContext 
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage = completion.choices[0].message.content;

    // Check if we have enough info to create an order
    const orderInfo = extractOrderInfo(messages, assistantMessage);

    return NextResponse.json({
      message: assistantMessage,
      orderInfo: orderInfo,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}

function extractOrderInfo(messages: any[], response: string) {
  // This is a simple extraction - you can make it more sophisticated
  const allText = messages.map(m => m.content).join(' ') + ' ' + response;
  const lower = allText.toLowerCase();

  const info: any = {};

  // Check if we have guest count
  const adultMatch = lower.match(/(\d+)\s*(adults?|people)/);
  if (adultMatch) info.adults = parseInt(adultMatch[1]);

  const kidMatch = lower.match(/(\d+)\s*(kids?|children)/);
  if (kidMatch) info.kids = parseInt(kidMatch[1]);

  // Check for date
  const dateMatch = lower.match(/(tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\d{1,2}\/\d{1,2})/);
  if (dateMatch) info.eventDate = dateMatch[1];

  // Check for contact info
  const emailMatch = allText.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (emailMatch) info.email = emailMatch[1];

  const phoneMatch = allText.match(/(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/);
  if (phoneMatch) info.phone = phoneMatch[1];

  return Object.keys(info).length > 0 ? info : null;
}
