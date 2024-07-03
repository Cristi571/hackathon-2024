// App.tsx
import React from 'react';
import NfcCardReader from './NfsCardReader.tsx';
import {View} from "react-native"; // Make sure the path is correct

function App() {
  return (
      <View style={{ flex: 1 }}>
        <NfcCardReader />
      </View>
  );
}

export default App;
