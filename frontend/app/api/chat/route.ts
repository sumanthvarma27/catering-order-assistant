import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import axios from 'axios';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface MenuItem {
  name: string;
  category: string;
  price: number;
  description: string;
}

const SYSTEM_PROMPT = `You are an expert catering assistant for Royal Biryani House, a premium Indian restaurant specializing in authentic biryani and Indian cuisine.

YOUR ROLE:
- Help customers plan catering orders for their events
- Provide warm, professional, and personalized service
- Ask thoughtful questions to understand their needs
- Offer menu recommendations based on event type and guest count
- Provide pricing estimates and tray size suggestions

KEY INFORMATION TO GATHER:
1. Event type (wedding, corporate, birthday, etc.)
2. Number of guests
3. Event date and time
4. Dietary restrictions or preferences
5. Budget considerations
6. Delivery location

COMMUNICATION STYLE:
- Be warm, friendly, and enthusiastic
- Use emojis sparingly and appropriately 🍽️ ✨
- Keep responses concise (2-4 sentences max)
- Ask one question at a time
- Show genuine interest in making their event special

MENU RECOMMENDATIONS:
- Suggest appropriate portions based on guest count
- Recommend complementary dishes
- Highlight signature items like Royal Biryani
- Mention vegetarian and non-vegetarian options
- Consider the event type when suggesting menu items

Always maintain the premium, royal brand image while being approachable and helpful.`;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json();

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Fetch menu context from backend
    let menuContext = '';
    try {
      const menuRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/menu`,
        { timeout: 5000 }
      );
      
      if (menuRes.data && Array.isArray(menuRes.data)) {
        menuContext = '\n\nAVAILABLE MENU ITEMS:\n' + 
          menuRes.data.map((item: MenuItem) => 
            `- ${item.name} (${item.category}): $${item.price} - ${item.description}`
          ).join('\n');
      }
    } catch (menuError) {
      console.error('Menu fetch error:', menuError);
      menuContext = '\n\nNote: Full menu details are temporarily unavailable, but you can still provide general catering assistance.';
    }

    // Prepare messages for OpenAI with proper typing
    const openaiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT + menuContext },
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 500,
      messages: openaiMessages,
    });

    const response = completion.choices[0].message?.content || 
      'I apologize, but I\'m having trouble processing your request. Could you please try again?';

    return NextResponse.json({ 
      message: response,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('Chat API Error:', err);

    const error = err as { code?: string };

    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    if (error.code === 'invalid_api_key') {
      return NextResponse.json(
        { error: 'Configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to process chat request. Please try again.' },
      { status: 500 }
    );
  }
}