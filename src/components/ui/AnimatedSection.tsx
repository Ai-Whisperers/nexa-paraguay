'use client'

import React, { useRef } from 'react'
import { useInView } from './useInView'

interface AnimatedSectionProps {
  children?: React.ReactNode
  className?: string
  delay?: number
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up' | 'fade-scale'
  once?: boolean
  threshold?: number
  style?: React.CSSProperties
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
  once = true,
  threshold = 0.15,
  style,
}: AnimatedSectionProps) {
  const { ref, inView } = useInView(threshold, once)

  const baseClass = 'transition-all duration-700 ease-out'

  const animClasses: Record<string, string> = {
    'fade-up': inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    'fade-in': inView ? 'opacity-100' : 'opacity-0',
    'slide-left': inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12',
    'slide-right': inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12',
    'scale-up': inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90',
    'fade-scale': inView ? 'opacity-100 scale-100' : 'opacity-0 scale-75',
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${baseClass} ${animClasses[animation] || animClasses['fade-up']} ${className}`}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </div>
  )
}