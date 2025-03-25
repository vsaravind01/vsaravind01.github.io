import { clsx, type ClassValue } from "clsx";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Smoothly scrolls to a section when a link is clicked
 * @param offset Offset from the top (e.g., for fixed headers)
 * @returns A callback function to handle smooth scrolling
 */
export function useSmoothScroll(offset: number = 80) {
  return useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only process internal links that start with #
    if (!href.startsWith('#')) return;
    
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Scroll with animation
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: "smooth",
      });
      
      // Update URL without refreshing page
      window.history.pushState(null, '', href);
    }
  }, [offset]);
} 