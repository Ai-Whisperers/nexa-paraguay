'use client'

import { useState } from 'react'
import { useInView } from './useInView'
import { useCounter } from './useCounter'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  label?: string
}

export function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 1800,
  className = '',
  label,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView(0.3, true)
  const count = useCounter(target, duration, inView)

  return (
    <div ref={ref as any} className={`text-center ${className}`}>
      <div className="text-4xl md:text-5xl font-bold text-primary font-display">
        {prefix}{count}{suffix}
      </div>
      {label && (
        <div className="text-sm text-text-muted mt-1 font-medium">{label}</div>
      )}
    </div>
  )
}