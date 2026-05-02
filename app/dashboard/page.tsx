"use client"

import { useEffect, useState } from "react"
import AppShell from "../components/AppShell"

export default function Dashboard() {
 const [data, setData] = useState({
  totalIncome: 0,
  totalExpenses: 0,
  profit: 0,
})

  const income = Number(data?.totalIncome || 0)
  const expenses = Number(data?.totalExpenses || 0)
  const profit = Number(data?.profit || 0)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/dashboard")
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  return (
    <AppShell>

      {/* TITLE */}
      <div className="mb-12">
        <h1 className="text-4xl font-serif tracking-wide text-[#e5c06b]">
          Artist Dashboard
        </h1>
        <div className="w-12 h-[2px] bg-[#caa85a] mt-4" />
      </div>

      {/* FINANCE OVERVIEW */}
      <div className="grid grid-cols-3 gap-8 mb-12">

        {/* INCOME */}
        <div className="bg-white/[0.03] border border-[#caa85a]/20 p-6 backdrop-blur-xl">
          <p className="text-white/50 text-sm">Income</p>
          <p className="text-2xl text-green-400 mt-2">
            {income.toFixed(2)} THB
          </p>
        </div>

        {/* EXPENSES */}
        <div className="bg-white/[0.03] border border-[#caa85a]/20 p-6 backdrop-blur-xl">
          <p className="text-white/50 text-sm">Expenses</p>
          <p className="text-2xl text-red-400 mt-2">
            {expenses.toFixed(2)} THB
          </p>
        </div>

        {/* PROFIT */}
        <div className="bg-white/[0.03] border border-[#caa85a]/20 p-6 backdrop-blur-xl">
          <p className="text-white/50 text-sm">Profit</p>
          <p className={`text-2xl mt-2 ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
            {profit.toFixed(2)} THB
          </p>
        </div>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-8">

        {/* MEDIA */}
        <div className="bg-white/[0.03] border border-[#caa85a]/20 p-8 backdrop-blur-xl hover:border-[#caa85a]/40 transition group">
          <h2 className="text-xl font-serif mb-3 text-white">
            Media
          </h2>

          <p className="text-white/50 text-sm mb-6">
            Upload photos & videos
          </p>

          <a
            href="/dashboard/media"
            className="text-[#caa85a] text-sm tracking-[2px] flex items-center gap-2 group-hover:gap-3 transition"
          >
            Open →
          </a>
        </div>

        {/* INVOICES */}
        <div className="bg-white/[0.03] border border-[#caa85a]/20 p-8 backdrop-blur-xl hover:border-[#caa85a]/40 transition group">
          <h2 className="text-xl font-serif mb-3 text-white">
            Invoices
          </h2>

          <p className="text-white/50 text-sm mb-6">
            Create & manage invoices
          </p>

          <a
            href="/invoice/list"
            className="text-[#caa85a] text-sm tracking-[2px] flex items-center gap-2 group-hover:gap-3 transition"
          >
            Open →
          </a>
        </div>

        {/* EXPENSES */}
        <div className="bg-white/[0.03] border border-[#caa85a]/20 p-8 backdrop-blur-xl hover:border-[#caa85a]/40 transition group">
          <h2 className="text-xl font-serif mb-3 text-white">
            Expenses
          </h2>

          <p className="text-white/50 text-sm mb-6">
            Track money out
          </p>

          <a
            href="/expenses"
            className="text-[#caa85a] text-sm tracking-[2px] flex items-center gap-2 group-hover:gap-3 transition"
          >
            Open →
          </a>
        </div>

        {/* BOOKINGS */}
        <div className="bg-white/[0.03] border border-[#caa85a]/20 p-8 backdrop-blur-xl hover:border-[#caa85a]/40 transition group">
          <h2 className="text-xl font-serif mb-3 text-white">
            Bookings
          </h2>

          <p className="text-white/50 text-sm mb-6">
            Client requests
          </p>

          <a
            href="/dashboard/bookings"
            className="text-[#caa85a] text-sm tracking-[2px] flex items-center gap-2 group-hover:gap-3 transition"
          >
            Open →
          </a>
        </div>

      </div>

    </AppShell>
  )
}