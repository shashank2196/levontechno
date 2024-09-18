import React from 'react';
import { TrafficLightProvider } from './TrafficLightContext';
import TrafficLight from './TrafficLight';
import './index.css';

const App = () => {
  return (
    <TrafficLightProvider>
      <div className="App">
        <h1>Traffic Light Simulator</h1>
        <TrafficLight />
      </div>
    </TrafficLightProvider>
  );
};

export default App;
