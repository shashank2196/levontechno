import React, { useContext } from 'react';
import { TrafficLightContext } from './TrafficLightContext';

const PedestrianButton = () => {
  const { state, dispatch } = useContext(TrafficLightContext);

  const handlePedestrianRequest = () => {
    if (!state.pedestrianRequested) {
      dispatch({ type: 'REQUEST_CROSSING' });
    }
  };

  return (
    <button
      className={`pedestrian-button ${state.pedestrianRequested ? 'flashing' : ''}`}
      onClick={handlePedestrianRequest}
      disabled={state.pedestrianRequested} 
    >
      {state.pedestrianRequested ? 'Wait' : 'Request to Cross'}
    </button>
  );
};

export default PedestrianButton;
