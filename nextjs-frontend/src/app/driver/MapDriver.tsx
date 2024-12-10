'use client';

import { RefObject, useRef } from 'react';
import { useMap } from '../../hooks/useMap';

export function MapDriver() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  useMap(mapContainerRef as RefObject<HTMLDivElement>);

  return <div className="w-2/3 h-full" ref={mapContainerRef} />;
}
