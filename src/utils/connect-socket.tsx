'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket;

interface ISocketProps {
  getValue: (v: any) => void
}

const SocketClient = (props: ISocketProps) => {
  const [message, setMessage] = useState<any>();

  useEffect(() => {
    socket = io('wss://socket.mri.id/' as string, {
      // autoConnect: true,
      reconnection: true,
      reconnectionDelay: 3000,
      retries: 10,
      forceNew: true,
      // transports: ['polling', 'websocket'],

      extraHeaders: {
        'x-license-id': "J0AMWX-daQpNa-4fDODF-SqNFZi",
        // 'x-user-id': 'leaflet'
      }
    })

    socket.on('connect', () => {
      socket.emit('client-message', 'Hello from Next.js client!');
    });

    socket.on('broadcast-mri', (data) => {
      setMessage(data?.content);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (message) {
      props?.getValue(message)
    }
  }, [message])

  return (
    <div>
      {/* <h1>Socket.IO Client</h1> */}
      {/* <p>Message from server: {message}</p> */}
    </div>
  );
};

export default SocketClient;
