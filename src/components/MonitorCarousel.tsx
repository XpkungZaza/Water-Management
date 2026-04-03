"use client"

import { useState, useEffect } from "react"
import { Monitor, ChevronLeft, ChevronRight } from "lucide-react"

export function MonitorCarousel() {
  const [screen, setScreen] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setScreen((prev) => (prev === 3 ? 1 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative bg-slate-800 rounded-xl border border-slate-700 p-4 w-full h-[250px] shadow-2xl overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 p-2 opacity-50 flex items-center gap-2">
        <Monitor className="w-4 h-4 text-slate-300" />
        <span className="text-xs text-slate-300">Screen {screen}/3</span>
      </div>
      
      <div className="flex-grow flex items-center justify-center">
        {screen === 1 && (
          <div className="text-center animate-in fade-in duration-500">
            <h3 className="text-xl font-bold text-blue-400 mb-2">Overview</h3>
            <p className="text-slate-400">All systems nominal.</p>
          </div>
        )}
        {screen === 2 && (
          <div className="text-center animate-in fade-in duration-500">
            <h3 className="text-xl font-bold text-teal-400 mb-2">Efficiency</h3>
            <p className="text-slate-400">Power usage optimal.</p>
          </div>
        )}
        {screen === 3 && (
          <div className="text-center animate-in fade-in duration-500">
            <h3 className="text-xl font-bold text-amber-400 mb-2">Maintenance</h3>
            <p className="text-slate-400">Next check in 14 days.</p>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button 
          onClick={() => setScreen(p => p === 1 ? 3 : p - 1)}
          className="p-1 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-300" />
        </button>
        <div className="flex gap-2 items-center">
          {[1,2,3].map(indicator => (
            <div 
              key={indicator} 
              className={`w-2 h-2 rounded-full transition-colors ${indicator === screen ? 'bg-blue-500' : 'bg-slate-600'}`} 
            />
          ))}
        </div>
        <button 
          onClick={() => setScreen(p => p === 3 ? 1 : p + 1)}
          className="p-1 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-slate-300" />
        </button>
      </div>
    </div>
  )
}
