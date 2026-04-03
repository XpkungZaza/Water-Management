"use client"

import { Power } from "lucide-react"

interface PumpControlsProps {
  pump1On: boolean
  pump2On: boolean
  onTogglePump1: () => void
  onTogglePump2: () => void
  pump1Forced: boolean
  pump2Forced: boolean
}

export function PumpControls({ 
  pump1On, 
  pump2On, 
  onTogglePump1, 
  onTogglePump2,
  pump1Forced,
  pump2Forced
}: PumpControlsProps) {

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full transition-colors duration-500 shadow-inner ${pump1On ? 'bg-blue-600/20' : 'bg-slate-700'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-8 h-8 transition-colors duration-500 ${pump1On ? 'text-blue-400' : 'text-slate-500'}`}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v20M2 12h20" />
              <path d="m19 5-3.5 3.5" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-200">Pump 1</h3>
            <p className="text-sm text-slate-400">{pump1On ? 'Running' : 'Standby'}</p>
            {pump1Forced && <p className="text-xs text-amber-400 font-semibold mt-1">Auto-Override Active</p>}
          </div>
        </div>
        <button 
          onClick={onTogglePump1}
          disabled={pump1Forced}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${pump1On ? 'bg-red-500 hover:bg-red-400 shadow-red-500/50' : 'bg-green-500 hover:bg-green-400 shadow-green-500/50'} ${pump1Forced ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
        >
          <Power className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full transition-colors duration-500 shadow-inner ${pump2On ? 'bg-blue-600/20' : 'bg-slate-700'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-8 h-8 transition-colors duration-500 ${pump2On ? 'text-blue-400' : 'text-slate-500'}`}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v20M2 12h20" />
              <path d="m5 5 3.5 3.5" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-200">Pump 2</h3>
            <p className="text-sm text-slate-400">{pump2On ? 'Running' : 'Standby'}</p>
            {pump2Forced && <p className="text-xs text-amber-400 font-semibold mt-1">Auto-Override Active</p>}
          </div>
        </div>
        <button 
          onClick={onTogglePump2}
          disabled={pump2Forced}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${pump2On ? 'bg-red-500 hover:bg-red-400 shadow-red-500/50' : 'bg-green-500 hover:bg-green-400 shadow-green-500/50'} ${pump2Forced ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
        >
          <Power className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}
