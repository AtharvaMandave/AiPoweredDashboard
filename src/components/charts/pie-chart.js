'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe, TrendingUp, Users, Target } from 'lucide-react'

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']
const GRADIENTS = [
  'from-emerald-500 to-green-600',
  'from-blue-500 to-indigo-600',
  'from-amber-500 to-orange-600',
  'from-red-500 to-pink-600',
  'from-purple-500 to-violet-600',
  'from-pink-500 to-rose-600'
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        className="bg-white/90 dark:bg-gray-800/90 p-4 border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center space-x-2 mb-2">
          <Globe className="h-4 w-4 text-gray-500" />
          <p className="font-semibold text-gray-900 dark:text-white">{payload[0].name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-blue-500" />
          <p className="text-blue-600 font-bold text-xl">
            {payload[0].value}%
          </p>
        </div>
        <motion.div 
          className="w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-3"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    )
  }
  return null
}

export function TrafficPieChart({ data, loading = false }) {
  const [hoveredSegment, setHoveredSegment] = useState(null)

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
        className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        initial={false}
      />
      
      <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full -translate-y-16 translate-x-16"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-full translate-y-12 -translate-x-12"
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
                  Traffic Sources
                </CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-3"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Distribution</span>
                </div>
                <div className="flex items-center space-x-1 text-blue-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+15.3%</span>
                </div>
              </motion.div>
            </div>
            
            {/* Stats badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 px-3 py-2 rounded-xl"
            >
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                {data?.reduce((sum, item) => sum + item.value, 0) || 0}% total
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
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={3}
                  stroke="#ffffff"
                  onMouseEnter={(entry, index) => {
                    setHoveredSegment({ entry, index })
                  }}
                  onMouseLeave={() => setHoveredSegment(null)}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      stroke="#ffffff"
                      strokeWidth={3}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry) => (
                    <motion.span 
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {value}
                    </motion.span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Hover indicator */}
          <AnimatePresence>
            {hoveredSegment && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 rounded-xl px-3 py-2 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[hoveredSegment.index % COLORS.length] }}
                  ></div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {hoveredSegment.entry.name}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-10 rounded-bl-3xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        />
      </Card>
    </motion.div>
  )
} 