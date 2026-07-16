/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import DraggableWorkspace from './components/DraggableWorkspace';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Unmount the loading screen after its intro + fade-out have played.
    const timer = setTimeout(() => setLoading(false), 3300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <DraggableWorkspace />
      {loading && <LoadingScreen />}
    </>
  );
}
