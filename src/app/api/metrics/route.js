export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const metrics = {
    revenue: {
      current: 124500,
      previous: 118200,
      growth: 5.3,
      trend: 'up'
    },
    users: {
      current: 45678,
      previous: 43210,
      growth: 5.7,
      trend: 'up'
    },
    conversions: {
      current: 2345,
      previous: 2189,
      growth: 7.1,
      trend: 'up'
    },
    growth: {
      current: 12.4,
      previous: 10.8,
      growth: 14.8,
      trend: 'up'
    }
  }

  return Response.json(metrics)
} 