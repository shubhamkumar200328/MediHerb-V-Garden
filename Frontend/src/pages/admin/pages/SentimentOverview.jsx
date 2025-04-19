import React, { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js"
import axios from "axios"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const SentimentOverview = () => {
  const [stats, setStats] = useState({
    total: 0,
    positive: 0,
    neutral: 0,
    negative: 0,
    trend: [],
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5015/api/sentiments")
        const data = res.data

        // Process sentiment counts
        const counts = {
          total: data.length,
          positive: 0,
          neutral: 0,
          negative: 0,
        }
        const trendMap = {}

        data.forEach((entry) => {
          const label = entry.label.toLowerCase()
          if (label in counts) counts[label]++

          const date = new Date(entry.createdAt).toLocaleDateString()
          if (!trendMap[date])
            trendMap[date] = { positive: 0, neutral: 0, negative: 0 }
          trendMap[date][label]++
        })

        const sortedDates = Object.keys(trendMap).sort()
        const trend = sortedDates.map((date) => ({
          date,
          ...trendMap[date],
        }))

        setStats({
          total: counts.total,
          positive: counts.positive,
          neutral: counts.neutral,
          negative: counts.negative,
          trend,
        })
      } catch (err) {
        console.error("Failed to fetch sentiment stats:", err)
      }
    }

    fetchStats()
  }, [])

  const chartData = {
    labels: stats.trend.map((t) => t.date),
    datasets: [
      {
        label: "Positive",
        data: stats.trend.map((t) => t.positive),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Neutral",
        data: stats.trend.map((t) => t.neutral),
        backgroundColor: "rgba(201, 203, 207, 0.6)",
      },
      {
        label: "Negative",
        data: stats.trend.map((t) => t.negative),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  }

  return (
    <div className="p-6 rounded-xl shadow-xl bg-white">
      <h2 className="text-2xl font-bold mb-4">📊 Sentiment Overview</h2>

      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-green-100 p-4 rounded-xl">
          <h3 className="text-lg font-semibold">Total Reviews</h3>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl">
          <h3 className="text-lg font-semibold">Positive</h3>
          <p className="text-2xl font-bold">
            {((stats.positive / stats.total) * 100 || 0).toFixed(1)}%
          </p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl">
          <h3 className="text-lg font-semibold">Neutral</h3>
          <p className="text-2xl font-bold">
            {((stats.neutral / stats.total) * 100 || 0).toFixed(1)}%
          </p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl col-span-3">
          <h3 className="text-lg font-semibold">Negative</h3>
          <p className="text-2xl font-bold">
            {((stats.negative / stats.total) * 100 || 0).toFixed(1)}%
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">📅 Trend (Last 7 Days)</h3>
        <Bar data={chartData} />
      </div>
    </div>
  )
}

export default SentimentOverview
