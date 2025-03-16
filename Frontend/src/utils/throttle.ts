export function throttle<F extends (...args: any[]) => void>(
    func: F,
    limit: number = 500
  ) {
    let inThrottle: boolean;
  
    return (...args: Parameters<F>): void => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
}