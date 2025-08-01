'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Filter, X, Search, TrendingUp, TrendingDown, DollarSign, Users, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format, subDays, startOfDay, endOfDay } from 'date-fns'

export function AdvancedFilters({ onFiltersChange, loading = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState('right')
  const filterRef = useRef(null)
  const [filters, setFilters] = useState({
    dateRange: {
      start: subDays(new Date(), 30),
      end: new Date()
    },
    search: '',
    sortBy: 'revenue',
    sortOrder: 'desc',
    minRevenue: '',
    maxRevenue: '',
    minClicks: '',
    maxClicks: '',
    status: 'all'
  })

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleDateChange = (type, date) => {
    const newDateRange = { ...filters.dateRange, [type]: date }
    handleFilterChange('dateRange', newDateRange)
  }

  const clearFilters = () => {
    const defaultFilters = {
      dateRange: {
        start: subDays(new Date(), 30),
        end: new Date()
      },
      search: '',
      sortBy: 'revenue',
      sortOrder: 'desc',
      minRevenue: '',
      maxRevenue: '',
      minClicks: '',
      maxClicks: '',
      status: 'all'
    }
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (typeof value === 'string') return value !== '' && value !== 'all'
    if (typeof value === 'object' && value !== null) {
      if (value.start && value.end) return true
      return Object.values(value).some(v => v !== '' && v !== 'all')
    }
    return false
  }).length

  // Close filter panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={filterRef}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={() => {
            setIsOpen(!isOpen)
            // Check if there's enough space on the right, if not, position on the left
            if (!isOpen) {
              const button = document.querySelector('[data-filter-button]')
              if (button) {
                const rect = button.getBoundingClientRect()
                const spaceOnRight = window.innerWidth - rect.right
                setPosition(spaceOnRight < 400 ? 'left' : 'right')
              }
            }
          }}
          data-filter-button
          className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-800/50 hover:from-indigo-500/20 hover:to-purple-500/20"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {activeFiltersCount}
            </motion.div>
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 dropdown-backdrop bg-black/20"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full mt-2 dropdown-content w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto ${
                position === 'right' ? 'right-0' : 'left-0'
              }`}
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Date Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Date Range</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Start Date</label>
                      <input
                        type="date"
                        value={format(filters.dateRange.start, 'yyyy-MM-dd')}
                        onChange={(e) => handleDateChange('start', startOfDay(new Date(e.target.value)))}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">End Date</label>
                      <input
                        type="date"
                        value={format(filters.dateRange.end, 'yyyy-MM-dd')}
                        onChange={(e) => handleDateChange('end', endOfDay(new Date(e.target.value)))}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Search */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                  />
                </div>

                {/* Sort Options */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Sort By</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                    >
                      <option value="revenue">Revenue</option>
                      <option value="clicks">Clicks</option>
                      <option value="impressions">Impressions</option>
                      <option value="ctr">CTR</option>
                      <option value="spend">Spend</option>
                    </select>
                    <select
                      value={filters.sortOrder}
                      onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                      className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                    >
                      <option value="desc">Descending</option>
                      <option value="asc">Ascending</option>
                    </select>
                  </div>
                </div>

                {/* Revenue Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Revenue Range</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min Revenue"
                      value={filters.minRevenue}
                      onChange={(e) => handleFilterChange('minRevenue', e.target.value)}
                      className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max Revenue"
                      value={filters.maxRevenue}
                      onChange={(e) => handleFilterChange('maxRevenue', e.target.value)}
                      className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Clicks Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>Clicks Range</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min Clicks"
                      value={filters.minClicks}
                      onChange={(e) => handleFilterChange('minClicks', e.target.value)}
                      className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max Clicks"
                      value={filters.maxClicks}
                      onChange={(e) => handleFilterChange('maxClicks', e.target.value)}
                      className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Status</span>
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={clearFilters}
                    variant="ghost"
                    className="flex-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Clear All
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                    disabled={loading}
                  >
                    {loading ? 'Applying...' : 'Apply Filters'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
} 