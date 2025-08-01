import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num)
}

export function formatPercentage(value) {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
} 