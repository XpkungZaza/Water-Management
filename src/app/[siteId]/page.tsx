"use client"

import { useState, useEffect } from "react"
import { MonitorCarousel } from "@/components/MonitorCarousel"
import { PowerDisplay } from "@/components/PowerDisplay"
import { PumpControls } from "@/components/PumpControls"
import { WaterLevelGraph } from "@/components/WaterLevelGraph"
import { Droplet } from "lucide-react"

export default function SiteDashboard({ params }: { params: { siteId: string } }) {
  // State
  const [level, setLevel] = useState(2.0)
  const [history, setHistory] = useState<{ time: string, level: number }[]>([])
  
  // Manual toggle state
  const [manualPump1, setManualPump1] = useState(false)
  const [manualPump2, setManualPump2] = useState(false)

  // Initialization: Seed history
  useEffect(() => {
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: new Date(Date.now() - (20 - i) * 2000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      level: 2.0
    }))
    setHistory(initialData)
  }, [])

  // Simulate water level changes
  useEffect(() => {
    const timer = setInterval(() => {
      setLevel((prev) => {
        // Random walk
        const change = (Math.random() - 0.5) * 1.5
        let next = prev + change
        if (next < 0) next = 0
        if (next > 10) next = 10
        return next
      })
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  // Update history array
  useEffect(() => {
    setHistory(prev => {
      const newEntry = { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), level: level }
      const newHistory = [...prev, newEntry]
      if (newHistory.length > 20) newHistory.shift()
      return newHistory
    })
  }, [level])

  // Automation Logic
  let pump1Forced = false
  let pump2Forced = false
  let actualPump1 = manualPump1
  let actualPump2 = manualPump2

  if (level >= 7) {
    pump1Forced = true
    pump2Forced = true
    actualPump1 = true
    actualPump2 = true
  } else if (level >= 5) {
    pump1Forced = true
    pump2Forced = false
    actualPump1 = true
    actualPump2 = manualPump2 // P2 gets manual state
  } else if (level >= 3) {
    pump1Forced = false
    pump2Forced = true
    actualPump1 = manualPump1
    actualPump2 = true
  }
  // Below 3: no forces, actual = manual

  // Power values (A1, A2, A3) derived from water levels
  // We just create some visual formulas based on level + actual pump state
  const pumpPower = (actualPump1 ? 12.5 : 0) + (actualPump2 ? 12.5 : 0)
  const a1 = 5.0 + level * 0.5 + pumpPower
  const a2 = 4.8 + level * 0.4 + pumpPower
  const a3 = 5.2 + level * 0.6 + pumpPower

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8 text-slate-100 font-sans">
      <header className="mb-8 flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30">
            <Droplet className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Water Management Site #{params.siteId}
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
          <div className={`w-3 h-3 rounded-full ${level > 7 ? 'bg-red-500 animate-pulse' : level > 5 ? 'bg-amber-500 animate-pulse' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'}`} />
          <span className="text-sm font-medium">
            {level > 7 ? 'Critical Level' : level > 5 ? 'Warning Level' : 'System Secure'}
          </span>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <MonitorCarousel />
              <PowerDisplay a1={a1} a2={a2} a3={a3} />
            </div>
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-bold mb-6 text-slate-200">Pump Controls</h2>
              <PumpControls 
                pump1On={actualPump1} 
                pump2On={actualPump2}
                onTogglePump1={() => setManualPump1(!manualPump1)}
                onTogglePump2={() => setManualPump2(!manualPump2)}
                pump1Forced={pump1Forced}
                pump2Forced={pump2Forced}
              />
            </div>
          </div>
          <WaterLevelGraph data={history} />
        </div>
        
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4 border-b border-slate-700 pb-2">Automation Rules</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className={`flex gap-3 items-start p-3 rounded-lg transition-colors ${level >= 7 ? 'bg-red-500/10 border border-red-500/20' : ''}`}>
                <div className={`mt-0.5 w-2 h-2 rounded-full ${level >= 7 ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`} />
                <div>
                  <p className="font-semibold text-slate-200">Level ≥ 7m</p>
                  <p className="text-xs text-slate-400 mt-1">Both pumps forced ON.</p>
                </div>
              </li>
              <li className={`flex gap-3 items-start p-3 rounded-lg transition-colors ${level >= 5 && level < 7 ? 'bg-amber-500/10 border border-amber-500/20' : ''}`}>
                <div className={`mt-0.5 w-2 h-2 rounded-full ${level >= 5 && level < 7 ? 'bg-amber-500 animate-pulse' : 'bg-slate-600'}`} />
                <div>
                  <p className="font-semibold text-slate-200">Level ≥ 5m</p>
                  <p className="text-xs text-slate-400 mt-1">Pump 1 forced ON.</p>
                </div>
              </li>
              <li className={`flex gap-3 items-start p-3 rounded-lg transition-colors ${level >= 3 && level < 5 ? 'bg-blue-500/10 border border-blue-500/20' : ''}`}>
                <div className={`mt-0.5 w-2 h-2 rounded-full ${level >= 3 && level < 5 ? 'bg-blue-500 animate-pulse' : 'bg-slate-600'}`} />
                <div>
                  <p className="font-semibold text-slate-200">Level ≥ 3m</p>
                  <p className="text-xs text-slate-400 mt-1">Pump 2 forced ON.</p>
                </div>
              </li>
              <li className={`flex gap-3 items-start p-3 rounded-lg transition-colors ${level < 3 ? 'bg-green-500/10 border border-green-500/20' : ''}`}>
                <div className={`mt-0.5 w-2 h-2 rounded-full ${level < 3 ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]' : 'bg-slate-600'}`} />
                <div>
                  <p className="font-semibold text-slate-200">Normal Operation</p>
                  <p className="text-xs text-slate-400 mt-1">Manual control active.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg flex-grow flex flex-col items-center justify-center text-center">
             <div className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">Current Water Level</div>
             <div className={`text-6xl font-black font-mono transition-colors duration-1000 ${level >= 7 ? 'text-red-400' : level >= 5 ? 'text-amber-400' : level >= 3 ? 'text-blue-400' : 'text-green-400'}`}>
               {level.toFixed(2)}<span className="text-2xl text-slate-500 ml-1">m</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
