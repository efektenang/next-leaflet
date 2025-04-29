'use client'

import dynamic from "next/dynamic";
import React from "react";

const MapsLayout = dynamic(() => import('@/components/layouts/maps.layout'), {
  ssr: false
})

export default function Home(): React.JSX.Element {
  return (
    <>
      <MapsLayout />
    </>
  );
}
