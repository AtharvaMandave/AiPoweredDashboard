'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  TrendingUp, 
  Calendar, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  RefreshCw,
  Sparkles,
  Zap,
  Eye,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  Activity
} from 'lucide-react'

export function AIPredictions({ metrics, charts }) {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(false)
  const [timeframe, setTimeframe] = useState('1month')
  const [lastUpdate, setLastUpdate] = useState(null)

  const timeframes = [
    { id: '1month', label: '1 Month', icon: Calendar },
    { id: '3months', label: '3 Months', icon: Calendar },
    { id: '6months', label: '6 Months', icon: Calendar },
    { id: '1year', label: '1 Year', icon: Calendar }
  ]

  const generatePredictions = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics,
          type: 'predictions',
          timeframe
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setPredictions(parsePredictions(data.analysis))
        setLastUpdate(new Date())
      } else {
        console.error('AI Predictions failed:', data.error)
      }
    } catch (error) {
      console.error('Error generating predictions:', error)
    } finally {
      setLoading(false)
    }
  }

  const parsePredictions = (analysis) => {
    // Parse AI response into structured predictions
    const lines = analysis.split('\n').filter(line => line.trim())
    const parsedPredictions = []
    
    let currentPrediction = null
    
    lines.forEach(line => {
      if (line.match(/^\d+\./)) {
        if (currentPrediction) {
          parsedPredictions.push(currentPrediction)
        }
        currentPrediction = {
          title: line.replace(/^\d+\.\s*/, ''),
          description: '',
          confidence: getConfidenceLevel(line),
          trend: getTrendDirection(line),
          icon: getPredictionIcon(line)
        }
      } else if (currentPrediction && line.trim()) {
        currentPrediction.description += line.trim() + ' '
      }
    })
    
    if (currentPrediction) {
      parsedPredictions.push(currentPrediction)
    }
    
    return parsedPredictions.slice(0, 6) // Limit to 6 predictions
  }

  const getConfidenceLevel = (text) => {
    const lowerText = text.toLowerCase()
    if (lowerText.includes('high') || lowerText.includes('strong') || lowerText.includes('likely')) {
      return 'high'
    } else if (lowerText.includes('medium') || lowerText.includes('moderate')) {
      return 'medium'
    } else if (lowerText.includes('low') || lowerText.includes('uncertain')) {
      return 'low'
    }
    return 'medium'
  }

  const getTrendDirection = (text) => {
    const lowerText = text.toLowerCase()
    if (lowerText.includes('increase') || lowerText.includes('growth') || lowerText.includes('up')) {
      return 'up'
    } else if (lowerText.includes('decrease') || lowerText.includes('decline') || lowerText.includes('down')) {
      return 'down'
    }
    return 'stable'
  }

  const getPredictionIcon = (text) => {
    const lowerText = text.toLowerCase()
    if (lowerText.includes('revenue') || lowerText.includes('money')) {
      return DollarSign
    } else if (lowerText.includes('user') || lowerText.includes('customer')) {
      return Users
    } else if (lowerText.includes('conversion')) {
      return Target
    } else if (lowerText.includes('activity') || lowerText.includes('engagement')) {
      return Activity
    }
    return TrendingUp
  }

  useEffect(() => {
    if (metrics && Object.keys(metrics).length > 0) {
      generatePredictions()
    }
  }, [metrics, timeframe])

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'high': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'low': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700'
    }
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        initial={false}
      />
      
      <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full -translate-y-16 translate-x-16"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-full translate-y-12 -translate-x-12"
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
                  <Brain className="h-6 w-6 text-blue-600" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-1 bg-blue-500/20 rounded-full"
                  />
                </div>
                <span>AI Predictions</span>
              </CardTitle>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Future Forecasts</span>
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
                onClick={generatePredictions}
                disabled={loading}
                variant="ghost"
                size="sm"
                className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="ml-2">Refresh</span>
              </Button>
            </motion.div>
          </div>
          
          {/* Timeframe navigation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex space-x-2 overflow-x-auto pb-2"
          >
            {timeframes.map((tf) => {
              const Icon = tf.icon
              return (
                <motion.div
                  key={tf.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={timeframe === tf.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTimeframe(tf.id)}
                    className={`flex items-center space-x-2 transition-all duration-300 ${
                      timeframe === tf.id 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                        : 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{tf.label}</span>
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
                key="predictions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {predictions.length > 0 ? (
                  predictions.map((prediction, index) => {
                    const Icon = prediction.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                            <Icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {prediction.title}
                              </h4>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(prediction.confidence)}`}>
                                  {prediction.confidence} confidence
                                </span>
                                {prediction.trend === 'up' ? (
                                  <ArrowUpRight className={`h-4 w-4 ${getTrendColor(prediction.trend)}`} />
                                ) : prediction.trend === 'down' ? (
                                  <ArrowDownRight className={`h-4 w-4 ${getTrendColor(prediction.trend)}`} />
                                ) : (
                                  <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                              {prediction.description}
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
                      No predictions available. Try refreshing or check your data.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-10 rounded-bl-3xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        />
      </Card>
    </motion.div>
  )
} 