import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '@/utils'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    // 更新状态，下次渲染时显示降级UI
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 可以在这里记录错误信息
    console.error('ErrorBoundary caught an error', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // 如果提供了自定义的fallback，则使用它
      if (this.props.fallback) {
        return this.props.fallback
      }

      // 否则使用默认的错误UI
      return (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-10">
            <img
              src={toAbsoluteUrl('/media/illustrations/20.svg')}
              className="dark:hidden max-h-[160px]"
              alt="error illustration"
            />
            <img
              src={toAbsoluteUrl('/media/illustrations/20-dark.svg')}
              className="light:hidden max-h-[160px]"
              alt="error illustration"
            />
          </div>

          <span className="badge badge-primary badge-outline mb-3">Component Error</span>

          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Something went wrong</h3>

          <div className="text-md text-gray-700 mb-6">
            {this.state.error && (
              <details className="mb-4 text-left p-4 bg-gray-100 dark:bg-gray-800 rounded">
                <summary className="cursor-pointer font-medium">Error Details</summary>
                <p className="mt-2 text-red-600 dark:text-red-400">{this.state.error.toString()}</p>
                {this.state.errorInfo && (
                  <pre className="mt-2 text-xs overflow-auto p-2 bg-gray-200 dark:bg-gray-700 rounded">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </details>
            )}
            <p>
              Please try refreshing the page or&nbsp;
              <Link to="/" className="text-primary font-medium hover:text-primary-active">
                return to the homepage
              </Link>
              .
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }
