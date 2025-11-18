import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

interface Message {
  role: string;
  content: string;
}

interface TrayItem {
  id: number;
  name: string;
  category: string;
  suggested: string;
  size: 'HALF' | 'MEDIUM' | 'LARGE';
  count: number;
  price: number;
}

interface DetailsStatus {
  complete: boolean;
  menuItems?: TrayItem[];
  missingFields: string[];
}

const SYSTEM_PROMPT = `You are a helpful AI catering assistant for Royal Biryani House. Your goal is to collect the following information from customers in a natural, conversational way:

1. Occasion/Event Type (wedding, birthday, corporate, etc.)
2. Number of Guests
3. Event Date
4. Contact Name
5. Contact Phone Number

IMPORTANT INSTRUCTIONS:
- Be warm, friendly, and professional
- Ask questions ONE at a time - don't overwhelm customers
- Keep responses concise (2-3 sentences max)
- Don't repeat information the customer already provided

Once you have collected ALL 5 pieces of information (occasion, guest count, date, name, and phone), you MUST respond with EXACTLY this message:

"Perfect! I have all the information I need. Based on your event details, I've prepared a personalized catering menu for you. You can now see your customized recommendations in the cart on the right. Feel free to edit quantities, add recommended items, or remove what you don't need. Once you're happy, click 'Confirm Order' and we'll contact you within 24 hours!"

Menu items available:
- Appetizers: Chicken 65, Paneer Tikka
- Entrees: Butter Chicken, Chicken Curry
- Biryanis: Chicken Dum Biryani, Paneer Biryani
- Desserts: Gulab Jamun, Double Ka Meeta`;

export async function handleChatMessage(messages: Message[]): Promise<{ message: string }> {
  try {
    const formattedMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content
      }))
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 300,
    });

    const aiMessage = response.choices[0]?.message?.content || 
      "I apologize, but I'm having trouble responding right now. Could you please repeat that?";

    return { message: aiMessage };
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to get AI response');
  }
}

export function checkDetailsComplete(messages: Message[]): DetailsStatus {
  const conversation = messages.map(m => m.content.toLowerCase()).join(' ');
  const allMessages = messages.map(m => m.content).join(' ');

  // More flexible detection patterns
  const hasOccasion = /\b(wedding|birthday|corporate|party|anniversary|celebration|event|meeting|conference|gathering|reception)\b/i.test(conversation);
  
  const hasGuestCount = /\b(\d+)\s*(people|guests|persons|pax|attendees)\b/i.test(conversation) || 
                        /\b(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred)\b/i.test(conversation);
  
  const hasDate = /\b(january|february|march|april|may|june|july|august|september|october|november|december)/i.test(conversation) ||
                  /\b\d{1,2}[-/]\d{1,2}[-/]\d{2,4}\b/.test(conversation) ||
                  /\b\d{1,2}(st|nd|rd|th)?\s+(of\s+)?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(conversation) ||
                  /\b(tomorrow|next\s+week|next\s+month)\b/i.test(conversation);
  
  // Detect name - look for "my name is", "i'm", "this is", or capitalized words after those phrases
  const hasName = /\b(my\s+name\s+is|i'?m|call\s+me|this\s+is)\s+([A-Z][a-z]+)/i.test(allMessages) ||
                  /\b(name|called)\b.*[A-Z][a-z]+\s+[A-Z][a-z]+/.test(allMessages);
  
  // Detect phone - multiple formats
  const hasPhone = /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(conversation) ||
                   /\b\(\d{3}\)\s*\d{3}[-.\s]?\d{4}\b/.test(conversation) ||
                   /\b\d{10}\b/.test(conversation);

  console.log('🔍 Detection Results:', {
    hasOccasion,
    hasGuestCount,
    hasDate,
    hasName,
    hasPhone,
    conversationSample: conversation.substring(0, 200)
  });

  const missingFields: string[] = [];
  if (!hasOccasion) missingFields.push('occasion');
  if (!hasGuestCount) missingFields.push('guest count');
  if (!hasDate) missingFields.push('event date');
  if (!hasName) missingFields.push('contact name');
  if (!hasPhone) missingFields.push('phone number');

  const allDetailsCollected = Object.values({ hasOccasion, hasGuestCount, hasDate, hasName, hasPhone }).every(Boolean);

  console.log('✅ All Details Collected:', allDetailsCollected);
  console.log('❌ Missing Fields:', missingFields);

  // Extract guest count for menu generation
  let guestCount = 50; // default
  const guestMatch = conversation.match(/\b(\d+)\s*(people|guests|persons|pax|attendees)\b/i);
  if (guestMatch) {
    guestCount = parseInt(guestMatch[1]);
  }

  // Generate menu items if details are complete
  let menuItems: TrayItem[] | undefined;
  if (allDetailsCollected) {
    console.log('🎉 Generating menu for', guestCount, 'guests');
    menuItems = generateMenuItems(guestCount);
  }

  return {
    complete: allDetailsCollected,
    menuItems,
    missingFields,
  };
}

function generateMenuItems(guestCount: number): TrayItem[] {
  const items: TrayItem[] = [];
  let idCounter = 1;

  // Calculate quantities based on guest count
  const appetizerTrays = Math.max(1, Math.ceil(guestCount / 20));
  const entreeTrays = Math.max(1, Math.ceil(guestCount / 20));
  const biryaniTrays = Math.max(1, Math.ceil(guestCount / 14));
  const dessertTrays = Math.max(1, Math.ceil(guestCount / 40));

  // Appetizers
  if (guestCount >= 30) {
    items.push({
      id: idCounter++,
      name: 'Chicken 65',
      category: 'Non Veg Appetizers',
      suggested: `${appetizerTrays} MEDIUM (18-20 people each)`,
      size: 'MEDIUM',
      count: appetizerTrays,
      price: 150,
    });
  } else {
    items.push({
      id: idCounter++,
      name: 'Chicken 65',
      category: 'Non Veg Appetizers',
      suggested: '1 HALF (10 people)',
      size: 'HALF',
      count: 1,
      price: 100,
    });
  }

  // Entrees
  items.push({
    id: idCounter++,
    name: 'Butter Chicken',
    category: 'Non-Veg Entrees',
    suggested: `${entreeTrays} MEDIUM (20 people each)`,
    size: 'MEDIUM',
    count: entreeTrays,
    price: 160,
  });

  // Biryanis
  items.push({
    id: idCounter++,
    name: 'Chicken Dum Biryani',
    category: 'Non-Veg Biryanis',
    suggested: `${biryaniTrays} MEDIUM (12-14 people each)`,
    size: 'MEDIUM',
    count: biryaniTrays,
    price: 180,
  });

  // Add veg option for larger parties
  if (guestCount >= 30) {
    items.push({
      id: idCounter++,
      name: 'Paneer Biryani',
      category: 'Veg Biryanis',
      suggested: '1 MEDIUM (12-14 people)',
      size: 'MEDIUM',
      count: 1,
      price: 140,
    });
  }

  // Desserts
  items.push({
    id: idCounter++,
    name: 'Gulab Jamun',
    category: 'Desserts',
    suggested: `${dessertTrays} MEDIUM (40 pieces each)`,
    size: 'MEDIUM',
    count: dessertTrays,
    price: 60,
  });

  console.log('📋 Generated Menu Items:', items.length, 'items');
  return items;
}