# Royal Biryani House - Catering Chatbot 🍽️

An AI-powered catering assistant for Royal Biryani House that helps customers plan their events with personalized menu recommendations and instant quotes.

## 📁 Project Structure

```
RESTAURANT-CATERING-ASSISTANT/
├── frontend/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts          # Chat API endpoint
│   │   ├── components/
│   │   │   └── RoyalChatInterface.tsx # Main chat component
│   │   ├── globals.css                # Global styles
│   │   ├── layout.tsx                 # Root layout
│   │   └── page.tsx                   # Landing page
│   ├── public/
│   │   └── favicon.ico
│   ├── package.json
│   └── next.config.ts
└── backend/
    └── (your backend files)
```

## 🚀 Files to Update

### 1. **frontend/app/components/RoyalChatInterface.tsx**
Replace your existing file with the new version that includes:
- Enhanced UI matching Royal Biryani House branding
- Smooth animations with Framer Motion
- Welcome message on first load
- Better loading states
- Improved accessibility

### 2. **frontend/app/globals.css**
Update with enhanced styling including:
- Royal Biryani House color scheme
- Custom animations
- Better scrollbar styling
- Responsive chat bubbles
- Typography improvements

### 3. **frontend/app/page.tsx**
Enhanced landing page with:
- Hero section matching website design
- Feature highlights
- Call-to-action sections
- Better responsive design

### 4. **frontend/app/api/chat/route.ts**
Improved API route with:
- Better error handling
- Enhanced system prompt
- Menu context integration
- Proper validation

## 🎨 Design Features

### Color Scheme
- **Primary**: `#c97e38` (Amber)
- **Secondary**: `#7c2d12` (Copper)
- **Background**: `#f8f3e7` (Cream)
- **Accent**: `#c8a46d` (Gold)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### UI Components
- Gradient royal button with shadow
- Animated chat bubbles
- Typing indicator
- Smooth transitions
- Backdrop blur effects

## 📦 Installation

### Prerequisites
```bash
Node.js >= 18.0.0
npm or yarn
```

### Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
Create `.env.local` in the frontend directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. **Run development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open browser**
Navigate to `http://localhost:3000`

## 🔧 Configuration

### Update Backend URL
In `frontend/app/api/chat/route.ts`, update the API URL:
```typescript
const menuRes = await axios.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/menu`
);
```

### Customize System Prompt
Edit the `SYSTEM_PROMPT` in `route.ts` to adjust the AI assistant's behavior.

### Modify Colors
Update color variables in `globals.css`:
```css
:root {
  --color-amber: #c97e38;
  --color-copper: #7c2d12;
  --color-cream: #f8f3e7;
  --color-gold: #c8a46d;
}
```

## 🎯 Features

### Chat Interface
- ✅ Real-time messaging
- ✅ Typing indicators
- ✅ Message history
- ✅ Error handling
- ✅ Responsive design
- ✅ Accessibility features

### AI Assistant
- ✅ Event planning assistance
- ✅ Menu recommendations
- ✅ Portion size suggestions
- ✅ Price estimates
- ✅ Dietary accommodation

### User Experience
- ✅ Smooth animations
- ✅ Mobile-friendly
- ✅ Fast load times
- ✅ Intuitive interface
- ✅ Brand consistency

## 🐛 Troubleshooting

### Chat button not appearing
- Check if `RoyalChatInterface` is imported correctly
- Verify state management in parent component

### API errors
- Confirm `OPENAI_API_KEY` is set in `.env.local`
- Check backend API URL is correct
- Verify backend server is running

### Styling issues
- Ensure Tailwind CSS is properly configured
- Check if fonts are loading (Playfair Display, Inter)
- Clear browser cache

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔐 Environment Variables

Required variables in `.env.local`:
```env
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Other Platforms
Build the project:
```bash
npm run build
npm start
```

## 📄 License

Proprietary - Royal Biryani House

## 🤝 Support

For issues or questions, contact the development team.

---

**Made with ❤️ for Royal Biryani House**