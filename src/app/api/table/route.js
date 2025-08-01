export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const sortBy = searchParams.get('sortBy') || 'date'
  const sortOrder = searchParams.get('sortOrder') || 'desc'
  const search = searchParams.get('search') || ''

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))

  const mockData = [
    { id: 1, campaign: 'Summer Sale 2024', clicks: 15420, impressions: 89000, ctr: 17.3, cpc: 0.85, spend: 13107, conversions: 234, revenue: 18750, date: '2024-07-15' },
    { id: 2, campaign: 'Brand Awareness Q2', clicks: 8920, impressions: 67000, ctr: 13.3, cpc: 1.20, spend: 10704, conversions: 156, revenue: 12480, date: '2024-07-14' },
    { id: 3, campaign: 'Product Launch', clicks: 12340, impressions: 78000, ctr: 15.8, cpc: 0.95, spend: 11723, conversions: 198, revenue: 15840, date: '2024-07-13' },
    { id: 4, campaign: 'Holiday Special', clicks: 18760, impressions: 95000, ctr: 19.7, cpc: 0.75, spend: 14070, conversions: 289, revenue: 23120, date: '2024-07-12' },
    { id: 5, campaign: 'Retargeting Ads', clicks: 6540, impressions: 45000, ctr: 14.5, cpc: 1.10, spend: 7194, conversions: 98, revenue: 7840, date: '2024-07-11' },
    { id: 6, campaign: 'Social Media Boost', clicks: 11230, impressions: 72000, ctr: 15.6, cpc: 0.90, spend: 10107, conversions: 167, revenue: 13360, date: '2024-07-10' },
    { id: 7, campaign: 'Email Campaign', clicks: 8760, impressions: 58000, ctr: 15.1, cpc: 1.05, spend: 9198, conversions: 134, revenue: 10720, date: '2024-07-09' },
    { id: 8, campaign: 'Influencer Partnership', clicks: 14320, impressions: 82000, ctr: 17.5, cpc: 0.80, spend: 11456, conversions: 201, revenue: 16080, date: '2024-07-08' },
    { id: 9, campaign: 'Video Ads', clicks: 9870, impressions: 65000, ctr: 15.2, cpc: 1.15, spend: 11350, conversions: 145, revenue: 11600, date: '2024-07-07' },
    { id: 10, campaign: 'Mobile Optimization', clicks: 16540, impressions: 92000, ctr: 18.0, cpc: 0.70, spend: 11578, conversions: 245, revenue: 19600, date: '2024-07-06' }
  ]

  // Filter data based on search
  let filteredData = mockData
  if (search) {
    filteredData = mockData.filter(item => 
      item.campaign.toLowerCase().includes(search.toLowerCase())
    )
  }

  // Sort data
  filteredData.sort((a, b) => {
    const aValue = a[sortBy]
    const bValue = b[sortBy]
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Paginate data
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = filteredData.slice(startIndex, endIndex)

  return Response.json({
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: filteredData.length,
      totalPages: Math.ceil(filteredData.length / limit)
    }
  })
} 