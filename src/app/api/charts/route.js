export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))

  const charts = {
    revenue: [
      { month: 'Jan', value: 85000 },
      { month: 'Feb', value: 92000 },
      { month: 'Mar', value: 98000 },
      { month: 'Apr', value: 105000 },
      { month: 'May', value: 112000 },
      { month: 'Jun', value: 118000 },
      { month: 'Jul', value: 124500 }
    ],
    traffic: [
      { source: 'Organic', value: 45 },
      { source: 'Direct', value: 25 },
      { source: 'Social', value: 20 },
      { source: 'Referral', value: 10 }
    ],
    conversions: [
      { day: 'Mon', value: 120 },
      { day: 'Tue', value: 145 },
      { day: 'Wed', value: 132 },
      { day: 'Thu', value: 168 },
      { day: 'Fri', value: 189 },
      { day: 'Sat', value: 156 },
      { day: 'Sun', value: 134 }
    ]
  }

  return Response.json(charts)
} 