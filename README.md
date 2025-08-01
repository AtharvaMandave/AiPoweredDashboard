# ADmyBRAND Insights - AI-Powered Analytics Dashboard

A modern, visually stunning analytics dashboard for digital marketing agencies built with Next.js 15, React, and Tailwind CSS. Now enhanced with **AI-powered insights** using Google's Gemini API for intelligent data analysis, predictions, and recommendations.

## 🚀 Features

### 📊 Dashboard Features
- **Overview Page** with key metrics cards (Revenue, Users, Conversions, Growth %)
- **Interactive Charts** - 3 types (line chart, bar chart, pie chart)
- **Data Table** with sorting, filtering, and pagination
- **Responsive Design** - looks perfect on desktop, tablet, and mobile

### 🤖 AI-Powered Features
- **AI Insights Panel** - Intelligent analysis of your data with actionable recommendations
- **AI Predictions** - Future forecasts and trend predictions with confidence levels
- **AI Chat Assistant** - Interactive conversation with your data using natural language
- **Smart Anomaly Detection** - Automatic identification of unusual patterns
- **Campaign Optimization** - AI-powered recommendations for better performance
- **Customer Insights** - Deep analysis of user behavior and segmentation

### 🎨 UI/UX Features
- **Modern Design System** - consistent colors, typography, spacing
- **Beautiful Visual Hierarchy** - clear information architecture
- **Smooth Animations** - micro-interactions, hover effects, loading states
- **Dark/Light Mode Toggle** - with persistent theme preference

### ⚡ Technical Features
- **Next.js 15** with App Router
- **React 19** with modern hooks
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for interactive charts
- **Lucide React** for icons
- **Mock API Routes** for realistic data

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Theme**: Custom dark/light mode
- **AI Integration**: Google Gemini API
- **AI Features**: Intelligent insights, predictions, and chat assistant

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aipower
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Add your Gemini API key to `.env.local`:
```bash
GEMINI_API_KEY="your-gemini-api-key-here"
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
aipower/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── metrics/route.js      # Key metrics API
│   │   │   ├── charts/route.js       # Chart data API
│   │   │   ├── table/route.js        # Data table API
│   │   │   └── ai/
│   │   │       ├── analysis/route.js # AI analysis API
│   │   │       └── chat/route.js     # AI chat API
│   │   ├── globals.css               # Global styles
│   │   ├── layout.js                 # Root layout
│   │   └── page.js                   # Main dashboard
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.js             # Button component
│   │   │   └── card.js               # Card component
│   │   ├── charts/
│   │   │   ├── line-chart.js         # Revenue line chart
│   │   │   ├── bar-chart.js          # Conversions bar chart
│   │   │   └── pie-chart.js          # Traffic pie chart
│   │   ├── ai-insights.js            # AI insights component
│   │   ├── ai-chat.js                # AI chat assistant
│   │   ├── ai-predictions.js         # AI predictions component
│   │   ├── data-table.js             # Data table component
│   │   ├── header.js                 # Header with theme toggle
│   │   ├── metrics-card.js           # Metrics cards
│   │   └── theme-provider.js         # Theme context
│   └── lib/
│       ├── utils.js                  # Utility functions
│       └── ai-service.js             # AI service integration
```

## 📊 API Endpoints

### `/api/metrics`
Returns key performance metrics:
```json
{
  "revenue": {
    "current": 124500,
    "previous": 118200,
    "growth": 5.3,
    "trend": "up"
  },
  "users": { ... },
  "conversions": { ... },
  "growth": { ... }
}
```

### `/api/charts`
Returns chart data for line, bar, and pie charts:
```json
{
  "revenue": [
    { "month": "Jan", "value": 85000 },
    { "month": "Feb", "value": 92000 }
  ],
  "traffic": [
    { "source": "Organic", "value": 45 },
    { "source": "Direct", "value": 25 }
  ],
  "conversions": [
    { "day": "Mon", "value": 120 },
    { "day": "Tue", "value": 145 }
  ]
}
```

### `/api/table`
Returns paginated table data with sorting and filtering:
```json
{
  "data": [
    {
      "id": 1,
      "campaign": "Summer Sale 2024",
      "clicks": 15420,
      "impressions": 89000,
      "ctr": 17.3,
      "spend": 13107,
      "revenue": 18750
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### `/api/ai/analysis`
AI-powered analysis endpoint:
```json
{
  "success": true,
  "analysis": "AI-generated insights and recommendations...",
  "type": "metrics",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### `/api/ai/chat`
AI chat assistant endpoint:
```json
{
  "success": true,
  "response": "AI response to user query...",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "conversationId": "1234567890"
}
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Error**: Red (#EF4444)
- **Purple**: (#8B5CF6)

### Typography
- **Font**: Geist Sans (Google Fonts)
- **Weights**: 400, 500, 600, 700
- **Sizes**: 12px, 14px, 16px, 18px, 24px, 32px

### Spacing
- **Grid Gap**: 6 (1.5rem)
- **Card Padding**: 6 (1.5rem)
- **Section Spacing**: 8 (2rem)

## 🔧 Customization

### Adding New Metrics
1. Update `/api/metrics/route.js` with new metric data
2. Add new metric card in `page.js`
3. Update `MetricsCard` component if needed

### Adding New Charts
1. Create new chart component in `components/charts/`
2. Add chart data to `/api/charts/route.js`
3. Import and use in `page.js`

### Styling
- Modify `globals.css` for theme variables
- Update Tailwind classes in components
- Use CSS custom properties for consistent theming

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm start
```

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance

- **Lazy Loading**: Components load on demand
- **Optimized Images**: Next.js Image optimization
- **Code Splitting**: Automatic with Next.js
- **Caching**: API responses cached
- **Animations**: Hardware accelerated with Framer Motion

## 🔮 Future Enhancements

- [x] AI-powered insights and analysis
- [x] AI chat assistant
- [x] AI predictions and forecasting
- [ ] Real-time data updates
- [ ] Export functionality (PDF, CSV)
- [ ] Advanced filtering options
- [ ] User authentication
- [ ] Multiple dashboard views
- [ ] Custom date ranges
- [ ] Alert system
- [ ] Mobile app
- [ ] Voice commands for AI assistant
- [ ] AI-powered automated reports
- [ ] Predictive analytics with machine learning

## 📄 License

MIT License - feel free to use this project for your own analytics dashboard!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using Next.js, React, and Tailwind CSS
# AiPoweredDashboard
