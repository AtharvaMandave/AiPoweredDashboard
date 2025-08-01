'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Download, FileText, FileSpreadsheet, ChevronDown, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

// Dynamic import for PDF functionality
let jsPDF = null
let autoTable = null

const loadPDFLibrary = async () => {
  try {
    const jsPDFModule = await import('jspdf')
    jsPDF = jsPDFModule.default
    await import('jspdf-autotable')
    return true
  } catch (error) {
    console.error('Failed to load PDF library:', error)
    return false
  }
}

export function ExportButton({ data, loading = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [pdfAvailable, setPdfAvailable] = useState(false)

  // Check PDF availability on mount
  useEffect(() => {
    loadPDFLibrary().then(available => setPdfAvailable(available))
  }, [])

  const exportToCSV = () => {
    setExporting(true)
    try {
      const headers = ['Campaign', 'Clicks', 'Impressions', 'CTR (%)', 'Spend', 'Revenue']
      const csvContent = [
        headers.join(','),
        ...data.map(row => [
          row.campaign,
          row.clicks,
          row.impressions,
          row.ctr,
          row.spend,
          row.revenue
        ].join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `campaign-data-${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error exporting CSV:', error)
    } finally {
      setExporting(false)
    }
  }

  const exportToPDF = async () => {
    setExporting(true)
    try {
      if (!jsPDF) {
        const loaded = await loadPDFLibrary()
        if (!loaded) {
          throw new Error('PDF library not available')
        }
      }

      const doc = new jsPDF()
      
      // Add title
      doc.setFontSize(20)
      doc.text('Campaign Performance Report', 14, 22)
      
      // Add subtitle
      doc.setFontSize(12)
      doc.setTextColor(100, 100, 100)
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30)
      
      // Add table
      const tableData = data.map(row => [
        row.campaign,
        row.clicks.toLocaleString(),
        row.impressions.toLocaleString(),
        `${row.ctr}%`,
        `$${row.spend.toLocaleString()}`,
        `$${row.revenue.toLocaleString()}`
      ])

      doc.autoTable({
        head: [['Campaign', 'Clicks', 'Impressions', 'CTR (%)', 'Spend', 'Revenue']],
        body: tableData,
        startY: 40,
        styles: {
          fontSize: 10,
          cellPadding: 5,
        },
        headStyles: {
          fillColor: [99, 102, 241],
          textColor: 255,
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252],
        },
      })

      doc.save(`campaign-report-${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('PDF export is not available. Please try CSV export instead.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          disabled={loading || exporting}
          className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 hover:from-emerald-500/20 hover:to-green-500/20"
        >
          <Download className="h-4 w-4" />
          <span>{exporting ? 'Exporting...' : 'Export'}</span>
          <ChevronDown className="h-4 w-4" />
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
              className="absolute top-full mt-2 right-0 dropdown-content w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl p-4"
            >
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Export Options
              </h3>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={exportToCSV}
                  disabled={exporting}
                  className="w-full flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 hover:from-blue-500/20 hover:to-cyan-500/20"
                >
                  <div className="flex items-center space-x-3">
                    <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">Export as CSV</span>
                  </div>
                  {exporting && <Check className="h-4 w-4 text-green-500" />}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={exportToPDF}
                  disabled={exporting || !pdfAvailable}
                  className={`w-full flex items-center justify-between backdrop-blur-sm border ${
                    pdfAvailable 
                      ? 'bg-gradient-to-r from-red-500/10 to-pink-500/10 border-red-200/50 dark:border-red-800/50 hover:from-red-500/20 hover:to-pink-500/20'
                      : 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 border-gray-200/50 dark:border-gray-800/50 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-red-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Export as PDF
                      {!pdfAvailable && <span className="text-xs text-gray-500 ml-1">(Unavailable)</span>}
                    </span>
                  </div>
                  {exporting && <Check className="h-4 w-4 text-green-500" />}
                  {!pdfAvailable && <AlertCircle className="h-4 w-4 text-gray-400" />}
                </Button>
              </motion.div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {exporting ? 'Preparing your export...' : 'Choose your preferred format'}
                </p>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export function RealTimeIndicator({ isActive = false }) {
  return (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}
        animate={isActive ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-xs text-gray-600 dark:text-gray-400">
        {isActive ? 'Live Updates' : 'Offline'}
      </span>
    </motion.div>
  )
} 