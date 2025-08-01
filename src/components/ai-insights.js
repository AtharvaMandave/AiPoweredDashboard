'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  TrendingUp, 
  Lightbulb, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  RefreshCw,
  Sparkles,
  Zap,
  Eye,
  BarChart3
} from 'lucide-react'

export function AIInsights({ metrics, charts, tableData }) {
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [lastUpdate, setLastUpdate] = useState(null)

  const insightTypes = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'opportunities', label: 'Opportunities', icon: Lightbulb },
    { id: 'risks', label: 'Risks', icon: AlertTriangle },
    { id: 'predictions', label: 'Predictions', icon: Brain }
  ]

  const generateInsights = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics,
          type: activeTab
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setInsights(parseInsights(data.analysis))
        setLastUpdate(new Date())
      } else {
        console.error('AI Analysis failed:', data.error)
      }
    } catch (error) {
      console.error('Error generating insights:', error)
    } finally {
      setLoading(false)
    }
  }

  const parseInsights = (analysis) => {
    // Parse AI response into structured insights
    const lines = analysis.split('\n').filter(line => line.trim())
    const parsedInsights = []
    
    let currentInsight = null
    
    lines.forEach(line => {
      if (line.match(/^\d+\./)) {
        if (currentInsight) {
          parsedInsights.push(currentInsight)
        }
        currentInsight = {
          title: line.replace(/^\d+\.\s*/, ''),
          description: '',
          type: getInsightType(line),
          icon: getInsightIcon(line)
        }
      } else if (currentInsight && line.trim()) {
        currentInsight.description += line.trim() + ' '
      }
    })
    
    if (currentInsight) {
      parsedInsights.push(currentInsight)
    }
    
    return parsedInsights.slice(0, 5) // Limit to 5 insights
  }

  const getInsightType = (text) => {
    const lowerText = text.toLowerCase()
    if (lowerText.includes('positive') || lowerText.includes('growth') || lowerText.includes('improvement')) {
      return 'positive'
    } else if (lowerText.includes('concern') || lowerText.includes('risk') || lowerText.includes('decline')) {
      return 'warning'
    } else if (lowerText.includes('opportunity') || lowerText.includes('potential')) {
      return 'opportunity'
    }
    return 'info'
  }

  const getInsightIcon = (text) => {
    const lowerText = text.toLowerCase()
    if (lowerText.includes('revenue') || lowerText.includes('money')) {
      return TrendingUp
    } else if (lowerText.includes('user') || lowerText.includes('customer')) {
      return Target
    } else if (lowerText.includes('conversion')) {
      return CheckCircle
    } else if (lowerText.includes('prediction') || lowerText.includes('forecast')) {
      return Brain
    }
    return Lightbulb
  }

  useEffect(() => {
    if (metrics && Object.keys(metrics).length > 0) {
      generateInsights()
    }
  }, [metrics, activeTab])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        initial={false}
      />
      
      <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full -translate-y-16 translate-x-16"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full translate-y-12 -translate-x-12"
          />
        </div>

        <CardHeader className="pb-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-3">
                <div className="relative">
                  <Brain className="h-6 w-6 text-purple-600" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-1 bg-purple-500/20 rounded-full"
                  />
                </div>
                <span>AI-Powered Insights</span>
              </CardTitle>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Intelligent Analysis</span>
                </div>
                {lastUpdate && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Updated {lastUpdate.toLocaleTimeString()}</span>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Refresh button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={generateInsights}
                disabled={loading}
                variant="ghost"
                size="sm"
                className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="ml-2">Refresh</span>
              </Button>
            </motion.div>
          </div>
          
          {/* Tab navigation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex space-x-2 overflow-x-auto pb-2"
          >
            {insightTypes.map((tab) => {
              const Icon = tab.icon
              return (
                <motion.div
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                        : 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{tab.label}</span>
                  </Button>
                </motion.div>
              )
            })}
          </motion.div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start space-x-3 p-4 bg-gray-100/50 dark:bg-gray-700/50 rounded-2xl"
                  >
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full shimmer"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-600 rounded shimmer"></div>
                      <div className="h-3 w-full bg-gray-200 dark:bg-gray-600 rounded shimmer"></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="insights"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {insights.length > 0 ? (
                  insights.map((insight, index) => {
                    const Icon = insight.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                          insight.type === 'positive' 
                            ? 'bg-green-50/50 dark:bg-green-900/20 border-green-200/50 dark:border-green-800/50' 
                            : insight.type === 'warning'
                            ? 'bg-orange-50/50 dark:bg-orange-900/20 border-orange-200/50 dark:border-orange-800/50'
                            : insight.type === 'opportunity'
                            ? 'bg-blue-50/50 dark:bg-blue-900/20 border-blue-200/50 dark:border-blue-800/50'
                            : 'bg-gray-50/50 dark:bg-gray-700/50 border-gray-200/50 dark:border-gray-600/50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-xl ${
                            insight.type === 'positive' 
                              ? 'bg-green-100 dark:bg-green-900/30' 
                              : insight.type === 'warning'
                              ? 'bg-orange-100 dark:bg-orange-900/30'
                              : insight.type === 'opportunity'
                              ? 'bg-blue-100 dark:bg-blue-900/30'
                              : 'bg-gray-100 dark:bg-gray-700'
                          }`}>
                            <Icon className={`h-4 w-4 ${
                              insight.type === 'positive' 
                                ? 'text-green-600' 
                                : insight.type === 'warning'
                                ? 'text-orange-600'
                                : insight.type === 'opportunity'
                                ? 'text-blue-600'
                                : 'text-gray-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {insight.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                              {insight.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No insights available. Try refreshing or check your data.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 opacity-10 rounded-bl-3xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        />
      </Card>
    </motion.div>
  )
} 