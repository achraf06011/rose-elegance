const items = [
  'ROSES', 'TULIPES', 'PIVOINES', 'DAHLIAS',
  'ORCHIDÉES', 'MAGNOLIAS', 'GERBERAS', 'LIS', 'ŒILLETS',
]
const doubled = [...items, ...items]

export default function Marquee() {
  return (
    <div className="bg-[#0F0C09] border-y border-white/[0.06] py-3.5 overflow-hidden">
      <div className="animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 mx-1">
            <span className="text-[#B8922A] text-[0.58rem] tracking-[0.52em] uppercase font-medium">
              {item}
            </span>
            <span className="text-white/18 text-sm">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
