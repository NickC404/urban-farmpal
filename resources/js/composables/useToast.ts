interface ToastOptions {
    title: string;
    description?: string;
    variant?: 'default' | 'destructive' | 'success';
    duration?: number;
}

export function toast(options: ToastOptions) {
    // For now, just log to console - in a real app you'd want a proper toast library
    const prefix = options.variant === 'destructive' ? '❌' : 
                   options.variant === 'success' ? '✅' : 'ℹ️';
    
    console.log(`${prefix} ${options.title}${options.description ? ': ' + options.description : ''}`);
    
    // You could also show a browser notification or implement a custom toast system
    if (typeof window !== 'undefined') {
        // Simple alert for now - replace with proper toast UI later
        const message = `${options.title}${options.description ? '\n' + options.description : ''}`;
        
        if (options.variant === 'destructive') {
            console.error(message);
        } else {
            console.info(message);
        }
    }
}
