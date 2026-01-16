import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.group('--- React Error Boundary Caught ---');
        console.error(error);
        console.info(errorInfo.componentStack);
        console.groupEnd();
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 z-[100] bg-black text-white p-12 flex flex-col items-center justify-center text-center">
                    <h2 className="text-4xl font-display font-medium text-gold-accent mb-4 underline">CRITICAL RENDERING ERROR</h2>
                    <p className="text-xl opacity-70 max-w-2xl mb-8">
                        The premium experience encountered a conflict during initialization.
                        This is likely due to a sequence timing issue.
                    </p>
                    <div className="bg-white/5 p-6 rounded border border-white/10 text-left w-full max-w-4xl overflow-auto max-h-[50vh]">
                        <p className="font-mono text-xs text-red-400 mb-4">{this.state.error && this.state.error.toString()}</p>
                        <pre className="font-mono text-[10px] text-white/30 whitespace-pre-wrap">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-12 px-8 py-3 bg-white text-black font-display font-medium uppercase tracking-widest hover:bg-gold-accent transition-colors"
                    >
                        Restart Experience
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
