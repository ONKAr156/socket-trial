import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:5000", { withCredentials: true });

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket.on('countUpdated', (newCount) => {
      setCount(newCount);
    });

    // Clean up the effect
    return () => {
      socket.off('countUpdated');
    };
  }, []);

  const incrementCount = () => {
    socket.emit('incrementCount');
  };

  return (
    <div>
      <h2>Count value is {count}</h2>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
}

export default App;