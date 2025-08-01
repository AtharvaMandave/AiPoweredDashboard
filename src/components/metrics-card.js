'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Users, Target, TrendingUp as TrendingUpIcon, Sparkles, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils'

const icons = {
  revenue: DollarSign,
  users: Users,
  conversions: Target,
  growth: TrendingUpIcon
}

const colors = {
  revenue: {
    gradient: 'from-emerald-500 to-teal-500',
    icon: 'text-emerald-600',
    bg: 'bg-emerald-50/50 dark:bg-emerald-900/20',
    border: 'border-emerald-200/50 dark:border-emerald-800/50',
    glow: 'shadow-emerald-500/20',
    hover: 'hover:shadow-emerald-500/30'
  },
  users: {
    gradient: 'from-blue-500 to-indigo-500',
    icon: 'text-blue-600',
    bg: 'bg-blue-50/50 dark:bg-blue-900/20',
    border: 'border-blue-200/50 dark:border-blue-800/50',
    glow: 'shadow-blue-500/20',
    hover: 'hover:shadow-blue-500/30'
  },
  conversions: {
    gradient: 'from-purple-500 to-pink-500',
    icon: 'text-purple-600',
    bg: 'bg-purple-50/50 dark:bg-purple-900/20',
    border: 'border-purple-200/50 dark:border-purple-800/50',
    glow: 'shadow-purple-500/20',
    hover: 'hover:shadow-purple-500/30'
  },
  growth: {
    gradient: 'from-orange-500 to-red-500',
    icon: 'text-orange-600',
    bg: 'bg-orange-50/50 dark:bg-orange-900/20',
    border: 'border-orange-200/50 dark:border-orange-800/50',
    glow: 'shadow-orange-500/20',
    hover: 'hover:shadow-orange-500/30'
  }
}

export function MetricsCard({ title, value, previousValue, growth, trend, type, loading = false }) {
  const Icon = icons[type]
  const colorScheme = colors[type]

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group"
      >
        <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-xl animate-pulse">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg shimmer"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-xl shimmer"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg shimmer mb-3"></div>
            <div className="text-xs h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const formatValue = (val) => {
    if (type === 'revenue') return formatCurrency(val)
    if (type === 'growth') return formatPercentage(val)
    return formatNumber(val)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-br ${colorScheme.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
        initial={false}
      />
      
      <Card className={`relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 ${colorScheme.hover}`}>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-current to-transparent rounded-full -translate-y-12 translate-x-12"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-current to-transparent rounded-full translate-y-10 -translate-x-10"
          />
        </div>

        {/* Floating particles */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 right-4 w-2 h-2 bg-current opacity-30 rounded-full"
        />
        <motion.div
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-4 left-4 w-1 h-1 bg-current opacity-20 rounded-full"
        />

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
            {title}
          </CardTitle>
          <motion.div
            className={`p-3 rounded-2xl ${colorScheme.bg} border ${colorScheme.border} backdrop-blur-sm`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className={`h-5 w-5 ${colorScheme.icon} group-hover:scale-110 transition-transform duration-300`} />
          </motion.div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <motion.div 
            className="text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {formatValue(value)}
          </motion.div>
          
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-center space-x-2"
            >
              {trend === 'up' ? (
                <motion.div 
                  className="flex items-center space-x-2 text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                    <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                  </div>
                  <span className="text-emerald-600 font-semibold">
                    {formatPercentage(growth)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    from last month
                  </span>
                </motion.div>
              ) : (
                <motion.div 
                  className="flex items-center space-x-2 text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <ArrowDownRight className="h-3 w-3 text-red-600" />
                  </div>
                  <span className="text-red-600 font-semibold">
                    {formatPercentage(growth)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    from last month
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* Success indicator */}
            <AnimatePresence>
              {trend === 'up' && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-1"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                  />
                  <span className="text-xs text-emerald-600 font-medium">Positive</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <motion.div
            className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div
              className={`h-full bg-gradient-to-r ${colorScheme.gradient} rounded-full`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: Math.min(growth / 100, 1) }}
              transition={{ delay: 0.7, duration: 1 }}
            />
          </motion.div>
        </CardContent>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        />

        {/* Corner accent */}
        <motion.div
          className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${colorScheme.gradient} opacity-10 rounded-bl-3xl`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        />
      </Card>
    </motion.div>
  )
} 