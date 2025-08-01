'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        className="bg-white/90 dark:bg-gray-800/90 p-4 border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-emerald-500" />
          <p className="text-emerald-600 font-bold text-xl">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
        <motion.div 
          className="w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-3"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    )
  }
  return null
}

export function RevenueLineChart({ data, loading = false }) {
  const [hoveredPoint, setHoveredPoint] = useState(null)

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group"
      >
        <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-xl animate-pulse">
          <CardHeader className="pb-4">
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg shimmer mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-gray-200 dark:bg-gray-700 rounded-2xl shimmer"></div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.01 }}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        initial={false}
      />
      
      <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full -translate-y-16 translate-x-16"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-500 to-emerald-500 rounded-full translate-y-12 -translate-x-12"
          />
        </div>

        <CardHeader className="pb-6 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Revenue Trend
                </CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-3"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</span>
                </div>
                <div className="flex items-center space-x-1 text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+12.5%</span>
                </div>
              </motion.div>
            </div>
            
            {/* Stats badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 px-3 py-2 rounded-xl"
            >
              <DollarSign className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                {formatCurrency(data?.reduce((sum, item) => sum + item.value, 0) || 0)}
              </span>
            </motion.div>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart 
                data={data} 
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                onMouseMove={(e) => {
                  if (e.activePayload) {
                    setHoveredPoint(e.activePayload[0])
                  }
                }}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenueStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981"/>
                    <stop offset="100%" stopColor="#14b8a6"/>
                  </linearGradient>
                </defs>
                
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#374151" 
                  opacity={0.2}
                  strokeWidth={0.5}
                />
                
                <XAxis 
                  dataKey="month" 
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#6B7280' }}
                />
                
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#6B7280' }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                
                <Tooltip content={<CustomTooltip />} />
                
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="url(#colorRevenueStroke)"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                  dot={false}
                  activeDot={{ 
                    r: 8, 
                    stroke: '#10B981', 
                    strokeWidth: 3, 
                    fill: '#ffffff',
                    filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))'
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Hover indicator */}
          <AnimatePresence>
            {hoveredPoint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 rounded-xl px-3 py-2 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {hoveredPoint.payload.month}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-10 rounded-bl-3xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        />
      </Card>
    </motion.div>
  )
} 