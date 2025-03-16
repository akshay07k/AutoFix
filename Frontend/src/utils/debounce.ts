export function debounce<F extends (...args: any[]) => void>(
  func: F,
  wait: number = 300
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}