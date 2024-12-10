'use client';

import { RefObject, useRef } from 'react';
import { useMap } from '../../hooks/useMap';

export default function AdminPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  useMap(mapContainerRef as RefObject<HTMLDivElement>);

  return <div className="h-screen w-full" ref={mapContainerRef} />;
}
