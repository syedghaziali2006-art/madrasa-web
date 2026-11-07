import React from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: any;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  unoptimized?: boolean;
}

export default function Image({
  src,
  alt = '',
  width,
  height,
  fill = false,
  priority,
  quality,
  sizes,
  unoptimized,
  className,
  style,
  loading,
  fetchPriority,
  ...props
}: ImageProps) {
  const imageSrc =
    typeof src === 'object' && src !== null && 'src' in src ? (src as { src: string }).src : src;

  const combinedStyle: React.CSSProperties = {
    ...(fill
      ? {
          position: 'absolute',
          height: '100%',
          width: '100%',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        }
      : {}),
    ...style,
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      style={combinedStyle}
      loading={priority ? 'eager' : loading || 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority || fetchPriority === 'high' ? 'high' : undefined}
      sizes={sizes}
      {...props}
    />
  );
}
