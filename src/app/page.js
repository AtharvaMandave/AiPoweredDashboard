'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Header } from '@/components/header'
import { MetricsCard } from '@/components/metrics-card'
import { RevenueLineChart } from '@/components/charts/line-chart'
import { ConversionsBarChart } from '@/components/charts/bar-chart'
import { TrafficPieChart } from '@/components/charts/pie-chart'
import { DataTable } from '@/components/data-table'
import { AIInsights } from '@/components/ai-insights'
import { AIChat } from '@/components/ai-chat'
import { AIPredictions } from '@/components/ai-predictions'
import { SkeletonMetrics, SkeletonChart, SkeletonTable } from '@/components/ui/skeleton'
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  ArrowRight,
  Star,
  Award,
  Rocket,
  Globe,
  Shield,
  Heart
} from 'lucide-react'

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null)
  const [charts, setCharts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsRes, chartsRes] = await Promise.all([
          fetch('/api/metrics'),
          fetch('/api/charts')
        ])
        
        const metricsData = await metricsRes.json()
        const chartsData = await chartsRes.json()
        
        setMetrics(metricsData)
        setCharts(chartsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const welcomeVariants = {
    hidden: { opacity: 0, y: -40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          {/* Floating Elements */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          />
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '2s' }}
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          />
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '4s' }}
            className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"
          />
        </div>

        <Header />
        
        <main className="relative z-10 container mx-auto px-6 py-8 max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* Hero Section */}
            <motion.div variants={welcomeVariants} className="text-center mb-16">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative inline-flex items-center justify-center w-20 h-20 mb-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl animate-pulse-slow"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl"></div>
                <Sparkles className="h-10 w-10 text-white relative z-10" />
                
                {/* Orbiting elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg"></div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-lg"></div>
                  <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full shadow-lg"></div>
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full shadow-lg"></div>
                </motion.div>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-900 dark:from-white dark:via-purple-200 dark:to-indigo-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                Welcome back! 👋
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Your analytics dashboard is looking absolutely phenomenal today. 
                Let's dive into the insights that matter most to your business growth.
              </motion.p>

              {/* Enhanced Quick Stats */}
              <motion.div 
                className="flex flex-wrap justify-center gap-4 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
              >
                {[
                  { icon: TrendingUp, text: "Revenue up 5.3%", color: "emerald", bg: "from-emerald-500/20 to-green-500/20" },
                  { icon: Users, text: "45,678 users", color: "blue", bg: "from-blue-500/20 to-cyan-500/20" },
                  { icon: Target, text: "2,345 conversions", color: "purple", bg: "from-purple-500/20 to-pink-500/20" },
                  { icon: Zap, text: "12.4% growth", color: "orange", bg: "from-orange-500/20 to-red-500/20" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative overflow-hidden bg-gradient-to-r ${stat.bg} backdrop-blur-sm border border-white/20 dark:border-gray-700/50 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-center space-x-3">
                      <stat.icon className={`h-5 w-5 text-${stat.color}-500 group-hover:scale-110 transition-transform duration-300`} />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                        {stat.text}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Achievement Badges */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1 }}
                className="flex justify-center items-center space-x-6 mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-200/50 px-4 py-2 rounded-full"
                >
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Top Performer</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-400/20 to-pink-400/20 backdrop-blur-sm border border-purple-200/50 px-4 py-2 rounded-full"
                >
                  <Award className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Excellence Award</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-400/20 to-emerald-400/20 backdrop-blur-sm border border-green-200/50 px-4 py-2 rounded-full"
                >
                  <Rocket className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">Rising Star</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Enhanced Metrics Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {loading ? (
                <SkeletonMetrics />
              ) : (
                [
                  { title: "Total Revenue", type: "revenue", icon: TrendingUp, gradient: "from-emerald-500 to-green-600" },
                  { title: "Active Users", type: "users", icon: Users, gradient: "from-blue-500 to-cyan-600" },
                  { title: "Conversions", type: "conversions", icon: Target, gradient: "from-purple-500 to-pink-600" },
                  { title: "Growth Rate", type: "growth", icon: Zap, gradient: "from-orange-500 to-red-600" }
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                    onHoverStart={() => setHoveredCard(index)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="relative group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500">
                      <MetricsCard
                        title={metric.title}
                        value={metrics?.[metric.type]?.current || 0}
                        previousValue={metrics?.[metric.type]?.previous || 0}
                        growth={metrics?.[metric.type]?.growth || 0}
                        trend={metrics?.[metric.type]?.trend || 'up'}
                        type={metric.type}
                        loading={loading}
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: hoveredCard === index ? 1 : 0 }}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <metric.icon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>

            {/* Enhanced Charts Section */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {loading ? (
                <>
                  <SkeletonChart />
                  <SkeletonChart />
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl"
                  >
                    <RevenueLineChart 
                      data={charts?.revenue || []} 
                      loading={loading} 
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl"
                  >
                    <ConversionsBarChart 
                      data={charts?.conversions || []} 
                      loading={loading} 
                    />
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Enhanced Traffic Sources and Data Table */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {loading ? (
                <>
                  <SkeletonChart />
                  <SkeletonTable />
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="lg:col-span-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl"
                  >
                    <TrafficPieChart 
                      data={charts?.traffic || []} 
                      loading={loading} 
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl"
                  >
                    <DataTable loading={loading} />
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* AI-Powered Insights Section */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {loading ? (
                <>
                  <SkeletonChart />
                  <SkeletonChart />
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl"
                  >
                    <AIInsights 
                      metrics={metrics} 
                      charts={charts} 
                      tableData={[]} 
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl"
                  >
                    <AIPredictions 
                      metrics={metrics} 
                      charts={charts} 
                    />
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <span className="text-lg font-semibold">Explore More Insights</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.div>
            </motion.div>
          </motion.div>
        </main>

        {/* AI Chat Assistant */}
        <AIChat metrics={metrics} charts={charts} tableData={[]} />
      </div>
  )
}
