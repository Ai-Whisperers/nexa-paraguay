import React from 'react'

interface Props {
  children: React.ReactNode
  name?: string
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      console.error(`[ErrorBoundary] ${this.props.name || 'section'}:`, this.state.error)
      return null // Silently fail — section doesn't render, rest of page works
    }
    return this.props.children
  }
}
