'use client'

import SocketClient from '@/utils/connect-socket'
import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'

const MapsLayout = dynamic(() => import('@/components/layouts/maps.layout'), {
  ssr: false
})

function Customer(): React.JSX.Element {
  const [lat, setLat] = useState<number>(0)
  const [long, setLong] = useState<number>(0)

  const [startPoint, setStartPoint] = useState<any>([0, 0])
  const [yourPoint, setYourPoint] = useState<any>([lat, long])
  const [endPoint, setEndPoint] = useState<any>(undefined)

  useEffect(() => {
    setYourPoint([lat, long])
  }, [lat, long])


  return (
    <>
      <SocketClient getValue={(v) => {
        setLat(v.location[0])
        setLong(v.location[1])
        // setYourPoint(v.location)
        setStartPoint(v.startPoint)
        setEndPoint(v?.endPoint)
      }} />

      <h1>Lokasi Kurir saat ini: </h1>
      <p>Latitude: {lat}</p>
      <p>Longitude: {long}</p>
      {
        lat !== 0 &&
        <MapsLayout startPoint={startPoint} yourPoint={yourPoint} endPoint={endPoint} />
      }
    </>
  )
}

export default Customer