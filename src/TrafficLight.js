import React, { useContext } from 'react';
import { TrafficLightContext } from './TrafficLightContext';
import Light from './Light';
import PedestrianButton from './PedestrianButton';

const TrafficLight = () => {
  const { state } = useContext(TrafficLightContext);

  return (
    <div className="traffic-light">
      <Light color="red" active={state.currentLight === 'red'} timer={state.timer} />
      <Light color="yellow" active={state.currentLight === 'yellow'} timer={state.timer} />
      <Light color="green" active={state.currentLight === 'green'} timer={state.timer} />
      <PedestrianButton />
    </div>
  );
};

export default TrafficLight;
