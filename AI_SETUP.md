# AI Setup Guide - ADmyBRAND Insights

This guide will help you set up the AI-powered features in your analytics dashboard.

## 🚀 Quick Setup

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key (it starts with `AIza...`)

### 2. Configure Environment Variables

1. Copy the example environment file:
```bash
cp env.example .env.local
```

2. Add your Gemini API key to `.env.local`:
```bash
GEMINI_API_KEY="your-actual-api-key-here"
```

3. Enable AI features:
```bash
NEXT_PUBLIC_ENABLE_AI_FEATURES="true"
NEXT_PUBLIC_AI_ANALYSIS_ENABLED="true"
NEXT_PUBLIC_AI_PREDICTIONS_ENABLED="true"
NEXT_PUBLIC_AI_INSIGHTS_ENABLED="true"
```

### 3. Start the Development Server

```bash
npm run dev
```

## 🤖 AI Features Overview

### AI Insights Panel
- **Location**: Main dashboard, below charts
- **Function**: Analyzes your metrics and provides intelligent insights
- **Features**: 
  - Performance analysis
  - Opportunity identification
  - Risk assessment
  - Actionable recommendations

### AI Predictions
- **Location**: Main dashboard, next to AI Insights
- **Function**: Provides future forecasts and trend predictions
- **Features**:
  - Revenue predictions
  - User growth forecasts
  - Conversion rate projections
  - Confidence levels for each prediction

### AI Chat Assistant
- **Location**: Floating button in bottom-right corner
- **Function**: Interactive conversation with your data
- **Features**:
  - Natural language queries
  - Context-aware responses
  - Quick suggestion buttons
  - Real-time conversation

## 💬 Using the AI Chat Assistant

### Sample Questions You Can Ask:

1. **Performance Analysis**:
   - "Analyze my revenue trends"
   - "What are the key performance insights?"
   - "How is my conversion rate performing?"

2. **Predictions**:
   - "Predict next month's growth"
   - "What will my revenue be in 3 months?"
   - "Forecast user growth for Q2"

3. **Optimization**:
   - "Suggest campaign optimizations"
   - "How can I improve conversions?"
   - "What are my biggest opportunities?"

4. **Risk Assessment**:
   - "Identify potential risks"
   - "What should I be concerned about?"
   - "Are there any anomalies in my data?"

5. **Strategic Planning**:
   - "What should my next steps be?"
   - "Recommend budget allocation"
   - "Suggest A/B testing ideas"

## 🔧 Customization

### Modifying AI Prompts

Edit `src/lib/ai-service.js` to customize the AI behavior:

```javascript
// Example: Customize the analysis prompt
async analyzeMetrics(metrics) {
  const prompt = `Your custom prompt here...`
  return await this.generateContent(prompt, { metrics })
}
```

### Adding New AI Features

1. Create a new method in `ai-service.js`:
```javascript
async generateCustomAnalysis(data) {
  const prompt = `Your custom analysis prompt...`
  return await this.generateContent(prompt, { data })
}
```

2. Add a new API endpoint in `src/app/api/ai/analysis/route.js`:
```javascript
case 'custom':
  analysis = await aiService.generateCustomAnalysis(metrics)
  break
```

3. Create a new component to display the results.

## 🛠️ Troubleshooting

### Common Issues

1. **"AI features are not enabled"**
   - Check that `NEXT_PUBLIC_ENABLE_AI_FEATURES="true"` in your `.env.local`
   - Verify your `GEMINI_API_KEY` is set correctly

2. **"API key is missing"**
   - Ensure your Gemini API key is properly set in `.env.local`
   - Restart your development server after adding the key

3. **"AI analysis failed"**
   - Check your internet connection
   - Verify your API key has sufficient quota
   - Check the browser console for detailed error messages

4. **Slow AI responses**
   - This is normal for AI processing
   - Responses typically take 2-5 seconds
   - Consider implementing caching for better performance

### API Quota Management

- Gemini API has rate limits and quotas
- Monitor your usage in [Google AI Studio](https://makersuite.google.com/app/apikey)
- Consider implementing caching for frequently requested analyses

## 🔒 Security Considerations

1. **API Key Security**:
   - Never commit your API key to version control
   - Use environment variables for all sensitive data
   - Consider using API key rotation

2. **Data Privacy**:
   - The AI service processes your dashboard data
   - Ensure compliance with your data privacy policies
   - Consider data anonymization for sensitive information

3. **Rate Limiting**:
   - Implement rate limiting to prevent API abuse
   - Monitor API usage and costs
   - Set up alerts for quota limits

## 📈 Performance Optimization

### Caching Strategies

1. **Client-side caching**:
```javascript
// Cache AI responses for 5 minutes
const cacheKey = `ai-analysis-${JSON.stringify(metrics)}`
const cached = localStorage.getItem(cacheKey)
if (cached && Date.now() - JSON.parse(cached).timestamp < 300000) {
  return JSON.parse(cached).data
}
```

2. **Server-side caching**:
```javascript
// Implement Redis or similar for server-side caching
const cacheKey = `ai:${type}:${hash(metrics)}`
const cached = await redis.get(cacheKey)
if (cached) return JSON.parse(cached)
```

### Error Handling

Implement graceful fallbacks:

```javascript
try {
  const aiResponse = await aiService.analyzeMetrics(metrics)
  return aiResponse
} catch (error) {
  console.error('AI analysis failed:', error)
  return {
    fallback: true,
    message: "AI analysis is temporarily unavailable. Please try again later."
  }
}
```

## 🎯 Best Practices

1. **Prompt Engineering**:
   - Be specific in your prompts
   - Include context and constraints
   - Test different prompt variations

2. **User Experience**:
   - Show loading states during AI processing
   - Provide fallback content when AI is unavailable
   - Give users control over AI features

3. **Monitoring**:
   - Track AI feature usage
   - Monitor response times
   - Log errors for debugging

4. **Cost Management**:
   - Monitor API usage and costs
   - Implement usage limits
   - Consider caching strategies

## 🚀 Deployment

### Production Setup

1. **Environment Variables**:
   ```bash
   GEMINI_API_KEY="your-production-api-key"
   NEXT_PUBLIC_ENABLE_AI_FEATURES="true"
   ```

2. **Build and Deploy**:
   ```bash
   npm run build
   npm start
   ```

3. **Monitoring**:
   - Set up error tracking (Sentry, etc.)
   - Monitor API usage and costs
   - Track user engagement with AI features

### Vercel Deployment

1. Add environment variables in Vercel dashboard
2. Deploy with `vercel --prod`
3. Monitor function execution times and costs

---

## 📞 Support

If you encounter issues with the AI features:

1. Check the browser console for error messages
2. Verify your API key and environment variables
3. Test with a simple prompt first
4. Check the [Gemini API documentation](https://ai.google.dev/docs)

Happy AI-powered analytics! 🚀 