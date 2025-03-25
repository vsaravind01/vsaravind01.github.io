"use client";

import { useSmoothScroll } from "@/lib/utils";
import React from "react";

interface SmoothScrollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * A link component that smoothly scrolls to the target section
 */
export default function SmoothScrollLink({ 
  href, 
  children, 
  className = "", 
  onClick,
  ...props 
}: SmoothScrollLinkProps & React.HTMLAttributes<HTMLAnchorElement>) {
  const handleSmoothScroll = useSmoothScroll();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only process internal links to sections
    if (href.startsWith('#')) {
      handleSmoothScroll(e, href);
      
      // Call the additional onClick handler if provided
      if (onClick) onClick();
    }
  };
  
  return (
    <a 
      href={href} 
      onClick={handleClick} 
      className={className}
      {...props}
    >
      {children}
    </a>
  );
} 