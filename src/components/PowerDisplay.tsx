"use vault"
// Using simple component for Power Display

export function PowerDisplay({ a1, a2, a3 }: { a1: number, a2: number, a3: number }) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Phase A1</div>
        <div className="text-2xl font-black text-amber-400 font-mono">{a1.toFixed(1)} <span className="text-sm font-normal text-slate-500">A</span></div>
      </div>
      <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Phase A2</div>
        <div className="text-2xl font-black text-amber-400 font-mono">{a2.toFixed(1)} <span className="text-sm font-normal text-slate-500">A</span></div>
      </div>
      <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Phase A3</div>
        <div className="text-2xl font-black text-amber-400 font-mono">{a3.toFixed(1)} <span className="text-sm font-normal text-slate-500">A</span></div>
      </div>
    </div>
  )
}
