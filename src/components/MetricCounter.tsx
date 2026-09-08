import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type MetricCounterProps = {
  value: number
  suffix: string
  label: string
  decimals?: number
}

export function MetricCounter({ value, suffix, label, decimals }: MetricCounterProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.5 })
  const reducedMotion = useReducedMotion()
  const current = useCountUp(value, inView, 1400, reducedMotion)
  const places = decimals ?? (Number.isInteger(value) ? 0 : 1)

  return (
    <div ref={ref} className="border-l border-[var(--color-line)] pl-5">
      <div className="font-[var(--font-display)] text-4xl font-medium text-[var(--color-paper)] sm:text-5xl">
        {current.toFixed(places)}
        <span className="text-[var(--color-cyan)]">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-[var(--color-paper-dim)]">{label}</div>
    </div>
  )
}
