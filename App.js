import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper'; 
import WeatherApp from './components/WeatherApp'; //imported WeatherApp component here

export default function App() {
  return (
    <PaperProvider>
      <WeatherApp />
    </PaperProvider>
  );
}
