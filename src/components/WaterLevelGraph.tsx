"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

interface WaterLevelGraphProps {
  data: { time: string, level: number }[]
}

export function WaterLevelGraph({ data }: WaterLevelGraphProps) {
  return (
    <div className="w-full h-[400px] bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
      <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
        Real-time Water Level
      </h3>
      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} />
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
              itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
            />
            
            <ReferenceLine y={1} stroke="#22c55e" strokeDasharray="3 3" label={{ position: 'right', value: '1m', fill: '#22c55e', fontSize: 12 }} />
            <ReferenceLine y={3} stroke="#eab308" strokeDasharray="3 3" label={{ position: 'right', value: '3m', fill: '#eab308', fontSize: 12 }} />
            <ReferenceLine y={5} stroke="#f97316" strokeDasharray="3 3" label={{ position: 'right', value: '5m', fill: '#f97316', fontSize: 12 }} />
            <ReferenceLine y={7} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: '7m', fill: '#ef4444', fontSize: 12 }} />
            
            <Area type="monotone" dataKey="level" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLevel)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
