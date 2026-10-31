import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: any;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: any;
  children?: React.ReactNode;
}

export default function Link({
  href,
  children,
  replace,
  className,
  prefetch,
  scroll,
  ...props
}: LinkProps) {
  const target =
    typeof href === 'object' && href !== null && 'pathname' in href ? (href as { pathname: string }).pathname : href || '';

  if (
    typeof target === 'string' &&
    (target.startsWith('http://') ||
      target.startsWith('https://') ||
      target.startsWith('mailto:') ||
      target.startsWith('tel:'))
  ) {
    return (
      <a href={target} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={target} replace={replace} className={className} {...props}>
      {children}
    </RouterLink>
  );
}
