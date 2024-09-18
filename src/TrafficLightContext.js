import React, { createContext, useReducer, useEffect } from 'react';


const initialState = {
  currentLight: 'green',
  pedestrianRequested: false,
  emergencyOverride: false,
  timer: 10, 
};


const actions = {
  CHANGE_LIGHT: 'CHANGE_LIGHT',
  REQUEST_CROSSING: 'REQUEST_CROSSING',
  EMERGENCY_OVERRIDE: 'EMERGENCY_OVERRIDE',
  RESET_TIMER: 'RESET_TIMER',
};


const trafficLightReducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_LIGHT:
      if (state.emergencyOverride) return { ...state }; 
      if (state.pedestrianRequested && state.currentLight === 'red') {
        return {
          ...state,
          pedestrianRequested: false,
          currentLight: 'green',
          timer: 10,
        };
      }
      switch (state.currentLight) {
        case 'green':
          return { ...state, currentLight: 'yellow', timer: 3 };
        case 'yellow':
          return { ...state, currentLight: 'red', timer: state.pedestrianRequested ? 12 : 7 };
        case 'red':
          return { ...state, currentLight: 'green', timer: 10 };
        default:
          return state;
      }
    case actions.REQUEST_CROSSING:
      return { ...state, pedestrianRequested: true };
    case actions.EMERGENCY_OVERRIDE:
      return { ...state, emergencyOverride: !state.emergencyOverride, currentLight: 'green', timer: 10 };
    case actions.RESET_TIMER:
      return { ...state, timer: action.payload };
    default:
      return state;
  }
};


export const TrafficLightContext = createContext();


export const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trafficLightReducer, initialState);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: actions.RESET_TIMER, payload: state.timer - 1 });
    }, 1000);

    if (state.timer <= 0) {
      dispatch({ type: actions.CHANGE_LIGHT });
    }

    return () => clearInterval(interval);
  }, [state.timer]);

  return (
    <TrafficLightContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficLightContext.Provider>
  );
};
