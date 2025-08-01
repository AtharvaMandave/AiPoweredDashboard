import { aiService } from '@/lib/ai-service'

export async function POST(request) {
  try {
    const { metrics, type } = await request.json()
    
    let analysis
    switch (type) {
      case 'metrics':
        analysis = await aiService.analyzeMetrics(metrics)
        break
      case 'predictions':
        analysis = await aiService.generatePredictions(metrics)
        break
      case 'campaigns':
        analysis = await aiService.generateCampaignRecommendations(metrics)
        break
      case 'anomalies':
        analysis = await aiService.detectAnomalies(metrics)
        break
      case 'customers':
        analysis = await aiService.generateCustomerInsights(metrics)
        break
      case 'market':
        analysis = await aiService.analyzeMarketTrends(metrics)
        break
      case 'content':
        analysis = await aiService.generateContentRecommendations(metrics)
        break
      case 'roi':
        analysis = await aiService.analyzeROI(metrics)
        break
      default:
        analysis = await aiService.analyzeMetrics(metrics)
    }

    return Response.json({
      success: true,
      analysis,
      type,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI Analysis Error:', error)
    return Response.json({
      success: false,
      error: error.message,
      fallback: "AI analysis is currently unavailable. Please try again later."
    }, { status: 500 })
  }
} 