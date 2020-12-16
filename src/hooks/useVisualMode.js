
import { useState } from 'react';



export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false ) {

    if (replace) {
        setMode(newMode)
        setHistory(prev => ([...prev.slice(0, prev.length -1), newMode]))
      } else {
        setMode(newMode)
        setHistory(prev => ([...prev, newMode]));
      }
    };

  function back() {
    if (history.length > 1) {
      setHistory(prev => ([...prev.slice(0, prev.length -1)]))
      setMode(history.slice(0, history.length -1)[history.length -2])
    }
  }
  return { mode, transition, back };
};




