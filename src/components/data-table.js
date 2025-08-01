'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Filter, Download, Eye, TrendingUp, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { AdvancedFilters } from '@/components/advanced-filters'
import { ExportButton, RealTimeIndicator } from '@/components/export-utils'
import { SkeletonTable } from '@/components/ui/skeleton'

export function DataTable({ loading = false }) {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [search, setSearch] = useState('')
  const [loadingData, setLoadingData] = useState(false)
  const [hoveredRow, setHoveredRow] = useState(null)
  const [filters, setFilters] = useState({})
  const [realTimeUpdates, setRealTimeUpdates] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const fetchData = async () => {
    setLoadingData(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        sortBy,
        sortOrder,
        search,
        ...filters
      })
      
      const response = await fetch(`/api/table?${params}`)
      const result = await response.json()
      
      setData(result.data)
      setPagination(result.pagination)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pagination.page, sortBy, sortOrder, search, filters])

  // Real-time updates simulation
  useEffect(() => {
    if (realTimeUpdates) {
      const interval = setInterval(() => {
        fetchData()
      }, 30000) // Update every 30 seconds

      return () => clearInterval(interval)
    }
  }, [realTimeUpdates])

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    setPagination(prev => ({ ...prev, page: 1 })) // Reset to first page when filters change
  }

  const toggleRealTimeUpdates = () => {
    setRealTimeUpdates(!realTimeUpdates)
  }

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return null
    return sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  if (loading) {
    return <SkeletonTable />
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
        className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        initial={false}
      />
      
      <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full -translate-y-16 translate-x-16"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full translate-y-12 -translate-x-12"
          />
        </div>

        <CardHeader className="pb-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Campaign Performance
              </CardTitle>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Performance Metrics</span>
                </div>
                <div className="flex items-center space-x-1 text-indigo-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+18.7%</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
            
            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-3"
            >
              <RealTimeIndicator isActive={realTimeUpdates} />
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={toggleRealTimeUpdates}
                  variant="ghost" 
                  size="sm" 
                  className={`flex items-center space-x-2 backdrop-blur-sm border ${
                    realTimeUpdates 
                      ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-200/50 dark:border-green-800/50' 
                      : 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 border-gray-200/50 dark:border-gray-800/50'
                  }`}
                >
                  <RefreshCw className={`h-4 w-4 ${realTimeUpdates ? 'text-green-600 animate-spin' : 'text-gray-600'}`} />
                  <span className="text-sm">Live</span>
                </Button>
              </motion.div>

              <AdvancedFilters onFiltersChange={handleFiltersChange} loading={loadingData} />
              
              <ExportButton data={data} loading={loadingData} />
            </motion.div>
          </div>
          
          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-white/20 dark:border-gray-700/50 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300"
            />
          </motion.div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="overflow-x-auto"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20 dark:border-gray-700/50">
                  {[
                    { key: 'campaign', label: 'Campaign' },
                    { key: 'clicks', label: 'Clicks', align: 'right' },
                    { key: 'impressions', label: 'Impressions', align: 'right' },
                    { key: 'ctr', label: 'CTR (%)', align: 'right' },
                    { key: 'spend', label: 'Spend', align: 'right' },
                    { key: 'revenue', label: 'Revenue', align: 'right' }
                  ].map((column) => (
                    <th 
                      key={column.key}
                      className={`py-4 px-4 font-semibold cursor-pointer hover:bg-white/20 dark:hover:bg-gray-700/50 transition-colors duration-200 ${column.align === 'right' ? 'text-right' : 'text-left'}`}
                      onClick={() => handleSort(column.key)}
                    >
                      <motion.div 
                        className={`flex items-center space-x-1 ${column.align === 'right' ? 'justify-end' : ''}`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-gray-700 dark:text-gray-300">{column.label}</span>
                        <SortIcon column={column.key} />
                      </motion.div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loadingData ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full"
                      />
                      <p className="mt-2 text-gray-500">Loading data...</p>
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onHoverStart={() => setHoveredRow(row.id)}
                      onHoverEnd={() => setHoveredRow(null)}
                      className={`border-b border-white/10 dark:border-gray-800/50 transition-all duration-300 ${
                        hoveredRow === row.id ? 'bg-white/20 dark:bg-gray-700/50' : 'hover:bg-white/10 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                          {row.campaign}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">{formatNumber(row.clicks)}</td>
                      <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">{formatNumber(row.impressions)}</td>
                      <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">{row.ctr}%</td>
                      <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">{formatCurrency(row.spend)}</td>
                      <td className="py-4 px-4 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(row.revenue)}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </motion.div>
          
          {/* Enhanced Pagination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-between mt-6 pt-4 border-t border-white/20 dark:border-gray-700/50"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
            </div>
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page <= 1}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </motion.div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page >= pagination.totalPages}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </CardContent>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-10 rounded-bl-3xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        />
      </Card>
    </motion.div>
  )
} 