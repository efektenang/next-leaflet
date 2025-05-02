'use client'

import useGeolocation from "@/utils/geolocation";
import { Col, Form, notification, Row, Select } from "antd";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

const MapsLayout = dynamic(() => import('@/components/layouts/maps.layout'), {
  ssr: false
})

const optionLocation = [
  { value: JSON.stringify([3.546925198718566, 98.6900148315562]), label: 'Concepto' },
  { value: JSON.stringify([3.61737217656966, 98.68598134596503]), label: 'Rumah' },
];

export default function Home(): React.JSX.Element {
  const { position, error } = useGeolocation();

  const [lat, setLat] = useState<number>(0)
  const [long, setLong] = useState<number>(0)

  useEffect(() => {
    if (position) {
      setLat(position?.lat)
      setLong(position?.lng)
    }
  }, [position])

  const [startPoint, setStartPoint] = useState<any>([0, 0])
  const [yourPoint, setYourPoint] = useState<any>([lat, long])
  const [previousLocation, setPreviousLocation] = useState([]);
  const [endPoint, setEndPoint] = useState<any>(undefined)
  const isFirstRender = useRef(true);

  useEffect(() => {
    setYourPoint([lat, long])
  }, [lat, long])

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setYourPoint([latitude, longitude]);
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    let intervalId: any;
    if (yourPoint || startPoint && endPoint) {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        setPreviousLocation(yourPoint);
        return;
      }

      intervalId = setInterval(() => {
        if (
          !previousLocation ||
          previousLocation[0] !== yourPoint[0] ||
          previousLocation[1] !== yourPoint[1]
        ) {
          sendLocationToApi(yourPoint);
          setPreviousLocation(yourPoint);
        }
      }, 5000); // 5000 milidetik = 5 detik
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [yourPoint, previousLocation, startPoint, endPoint]);

  const sendLocationToApi = async (location: any) => {
    try {
      await fetch('https://socket.mri.id/api/v1/message/message-broadcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'RIX eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.U2FsdGVkX18yWD8fKx3uQzjEa5wbzKEL6xUF3/gymtM20VLqbkS9xFOqmKeRRgRWHnCXDAUfR3u++efvftGDyjY0NHe+gfiIShZxjrvjB6WRDYCFmMJV38eorXVx2MP3y4q3/5grwWUVlqbvzPP2cIFWtkUpR6ySfk3beiCz1aDzmPCPvtJQHn4MmQcWpGKOSAV2Zh2Arjj+sdJKqPgQVl/jcV90HSqSOueQCewI/tjwTOm7AKj84XwxSITyzv2P.0jlEDUWeDkmitDqN1xPEynfVx3fbeSIj8Mu0OT9crx4'
        },
        body: JSON.stringify({
          "message": {
            location,
            startPoint,
            endPoint
          },
          "handshake": "broadcast-mri"
        }),
      });
    } catch (error: any) {
      notification.error({
        message: error,
      })
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!position) return <p>Getting location...</p>;

  return (
    <>
      <p>Latitude: {lat}</p>
      <p>Longitude: {long}</p>
      <h1 className="p-7">
        Leaflet Map
      </h1>

      {/* <SocketClient getValue={(v) => setYourPoint(v)} /> */}

      <Row className="grid grid-cols-3 gap-5 pl-7">
        <Col>
          <Form.Item label="From">
            <Select
              showSearch
              placeholder="Select Start Point"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={optionLocation}
              onChange={(value: string) => setStartPoint(JSON.parse(value))}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="To">
            <Select
              showSearch
              placeholder="Select Destination Point"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={optionLocation}
              onChange={(value: string) => setEndPoint(JSON.parse(value))}
            />
          </Form.Item>
        </Col>
      </Row>
      <MapsLayout startPoint={startPoint} yourPoint={yourPoint} endPoint={endPoint} />
    </>
  );
}
