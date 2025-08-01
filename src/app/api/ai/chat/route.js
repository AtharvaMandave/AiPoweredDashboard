import { aiService } from '@/lib/ai-service'

export async function POST(request) {
  try {
    const { message, context, conversationHistory = [] } = await request.json()
    
    // Build conversation context
    const fullContext = {
      ...context,
      conversationHistory: conversationHistory.slice(-10), // Keep last 10 messages
      currentMessage: message
    }

    const prompt = `You are an AI analytics assistant for ADmyBRAND Insights. 
    
    Previous conversation context: ${JSON.stringify(conversationHistory)}
    
    Current user message: ${message}
    
    Context data: ${JSON.stringify(context)}
    
    Please provide a helpful, professional response that:
    1. Directly addresses the user's question
    2. Provides actionable insights based on the data
    3. Suggests relevant next steps
    4. Maintains a conversational but professional tone
    
    Keep your response concise but comprehensive.`

    const response = await aiService.generateContent(prompt, fullContext)

    return Response.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
      conversationId: Date.now().toString()
    })
  } catch (error) {
    console.error('AI Chat Error:', error)
    return Response.json({
      success: false,
      error: error.message,
      fallback: "I'm having trouble processing your request right now. Please try again in a moment."
    }, { status: 500 })
  }
} 