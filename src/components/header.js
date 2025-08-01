'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Bell, Settings, User, Sparkles, Search, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import { useState } from 'react'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  // Safety check for theme availability
  const currentTheme = theme || 'light'
  const handleThemeToggle = toggleTheme || (() => {})

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-white/20 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
    >
      <div className="flex h-20 items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-6">
          <motion.div
            initial={{ scale: 0.8, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center space-x-4"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <Sparkles className="h-6 w-6 text-white" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-2xl border-2 border-white/20"
                />
              </div>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>
            
            <div className="hidden sm:block">
              <motion.h1 
                className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                ADmyBRAND Insights
              </motion.h1>
              <motion.p 
                className="text-sm text-gray-500 dark:text-gray-400 font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                AI-Powered Analytics Platform
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="hidden md:flex flex-1 max-w-md mx-8"
        >
          <div className="relative w-full">
            <motion.div
              className={`relative flex items-center w-full px-4 py-2 rounded-2xl border transition-all duration-300 ${
                searchFocused 
                  ? 'border-indigo-500/50 bg-white/90 dark:bg-gray-800/90 shadow-lg' 
                  : 'border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50'
              }`}
              animate={{
                scale: searchFocused ? 1.02 : 1,
                boxShadow: searchFocused ? "0 10px 25px -5px rgba(99, 102, 241, 0.1)" : "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
              }}
            >
              <Search className="h-4 w-4 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search analytics, reports, insights..."
                className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: searchFocused ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Theme Toggle */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              className="relative overflow-hidden w-10 h-10 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-300"
            >
              <motion.div
                initial={false}
                animate={{ rotate: currentTheme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative z-10"
              >
                {currentTheme === 'dark' ? (
                  <Sun className="h-5 w-5 text-amber-500" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-600" />
                )}
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            </Button> */}
          </motion.div>

          {/* Notifications */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button 
              variant="ghost" 
              size="icon"
              className="relative overflow-hidden w-10 h-10 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-300"
            >
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <motion.div
                className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            </Button>
          </motion.div>

          {/* Settings */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button 
              variant="ghost" 
              size="icon"
              className="relative overflow-hidden w-10 h-10 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-300"
            >
              <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            </Button>
          </motion.div>

          {/* User Profile */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="ghost" 
              size="icon"
              className="relative overflow-hidden w-10 h-10 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative overflow-hidden w-10 h-10 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-xl"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200/50 dark:border-gray-800/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl"
          >
            <div className="px-6 py-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Actions</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-xs">Dashboard</Button>
                  <Button variant="ghost" size="sm" className="text-xs">Reports</Button>
                  <Button variant="ghost" size="sm" className="text-xs">Settings</Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
} 