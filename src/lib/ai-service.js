// AI Service for Gemini API Integration
class AIService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY
    this.apiUrl = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
    this.isEnabled = process.env.NEXT_PUBLIC_ENABLE_AI_FEATURES === 'true'
  }

  async generateContent(prompt, context = {}) {
    if (!this.isEnabled || !this.apiKey) {
      throw new Error('AI features are not enabled or API key is missing')
    }

    try {
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: this.buildPrompt(prompt, context)
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      })

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`)
      }

      const data = await response.json()
      return data.candidates[0].content.parts[0].text
    } catch (error) {
      console.error('AI Service Error:', error)
      throw error
    }
  }

  buildPrompt(prompt, context) {
    const basePrompt = `You are an AI analytics expert for ADmyBRAND Insights, a digital marketing analytics dashboard. 
    
    Your role is to provide intelligent insights, predictions, and recommendations based on marketing data.
    
    Context: ${JSON.stringify(context)}
    
    User Request: ${prompt}
    
    Please provide a helpful, professional response that includes:
    1. Clear analysis of the data
    2. Actionable insights
    3. Specific recommendations
    4. Potential next steps
    
    Keep your response concise but comprehensive. Use bullet points where appropriate for better readability.`

    return basePrompt
  }

  // AI-Powered Data Analysis
  async analyzeMetrics(metrics) {
    const prompt = `Analyze the following marketing metrics and provide insights:
    
    Revenue: $${metrics.revenue.current} (${metrics.revenue.growth}% growth)
    Users: ${metrics.users.current} (${metrics.users.growth}% growth)
    Conversions: ${metrics.conversions.current} (${metrics.conversions.growth}% growth)
    Growth Rate: ${metrics.growth.current}% (${metrics.growth.growth}% change)
    
    Please provide:
    1. Key performance insights
    2. Areas of concern or opportunity
    3. Recommendations for improvement
    4. Predicted trends for the next month`

    return await this.generateContent(prompt, { metrics })
  }

  // AI-Powered Predictions
  async generatePredictions(historicalData) {
    const prompt = `Based on the following historical data, predict future trends for the next 3 months:
    
    Historical Data: ${JSON.stringify(historicalData)}
    
    Please provide:
    1. Revenue predictions with confidence intervals
    2. User growth projections
    3. Conversion rate forecasts
    4. Seasonal trends and patterns
    5. Risk factors to consider`

    return await this.generateContent(prompt, { historicalData })
  }

  // AI-Powered Campaign Recommendations
  async generateCampaignRecommendations(campaignData) {
    const prompt = `Analyze these campaign performance metrics and provide optimization recommendations:
    
    Campaign Data: ${JSON.stringify(campaignData)}
    
    Please provide:
    1. Top performing campaigns analysis
    2. Underperforming campaigns with improvement suggestions
    3. Budget allocation recommendations
    4. A/B testing suggestions
    5. Creative optimization tips`

    return await this.generateContent(prompt, { campaignData })
  }

  // AI-Powered Anomaly Detection
  async detectAnomalies(data) {
    const prompt = `Analyze this data for potential anomalies or unusual patterns:
    
    Data: ${JSON.stringify(data)}
    
    Please identify:
    1. Any unusual spikes or drops
    2. Potential data quality issues
    3. Seasonal vs. actual anomalies
    4. Recommended actions for each anomaly`

    return await this.generateContent(prompt, { data })
  }

  // AI-Powered Customer Insights
  async generateCustomerInsights(userData) {
    const prompt = `Analyze this user behavior data and provide customer insights:
    
    User Data: ${JSON.stringify(userData)}
    
    Please provide:
    1. Customer segmentation insights
    2. User journey analysis
    3. Conversion funnel optimization
    4. Personalization opportunities
    5. Retention strategies`

    return await this.generateContent(prompt, { userData })
  }

  // AI-Powered Market Analysis
  async analyzeMarketTrends(marketData) {
    const prompt = `Analyze these market trends and provide competitive insights:
    
    Market Data: ${JSON.stringify(marketData)}
    
    Please provide:
    1. Market position analysis
    2. Competitive advantages
    3. Market opportunities
    4. Threat assessment
    5. Strategic recommendations`

    return await this.generateContent(prompt, { marketData })
  }

  // AI-Powered Content Recommendations
  async generateContentRecommendations(contentData) {
    const prompt = `Analyze this content performance data and provide optimization recommendations:
    
    Content Data: ${JSON.stringify(contentData)}
    
    Please provide:
    1. Best performing content types
    2. Content optimization suggestions
    3. SEO recommendations
    4. Content calendar suggestions
    5. Engagement improvement tips`

    return await this.generateContent(prompt, { contentData })
  }

  // AI-Powered ROI Analysis
  async analyzeROI(roiData) {
    const prompt = `Analyze this ROI data and provide investment recommendations:
    
    ROI Data: ${JSON.stringify(roiData)}
    
    Please provide:
    1. ROI performance analysis
    2. Investment optimization suggestions
    3. Channel performance ranking
    4. Budget reallocation recommendations
    5. Future investment strategies`

    return await this.generateContent(prompt, { roiData })
  }
}

export const aiService = new AIService() 