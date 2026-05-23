'use client'

import React, { useRef } from 'react'
import { useInView } from './useInView'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up'
  once?: boolean
  threshold?: number
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
  once = true,
  threshold = 0.15,
}: AnimatedSectionProps) {
  const { ref, inView } = useInView(threshold, once)

  const baseClass = 'transition-all duration-700 ease-out'
  const animClass = inView
    ? { 'fade-up': 'opacity-100 translate-y-0', 'fade-in': 'opacity-100', 'slide-left': 'opacity-100 translate-x-0', 'slide-right': 'opacity-100 -translate-x-0', 'scale-up': 'opacity-100 scale-100' }[animation]
    : { 'fade-up': 'opacity-0 translate-y-8', 'fade-in': 'opacity-0', 'slide-left': 'opacity-0 -translate-x-12', 'slide-right': 'opacity-0 translate-x-12', 'scale-up': 'opacity-0 scale-90' }[animation]

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${baseClass} ${animClass} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}