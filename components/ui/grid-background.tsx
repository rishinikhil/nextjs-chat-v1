import React, { ReactNode } from 'react'

interface GridSmallBackgroundDemoProps {
  children?: ReactNode
}

export function GridSmallBackgroundDemo({
  children
}: GridSmallBackgroundDemoProps) {
  return (
    <div className="h-full w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  )
}