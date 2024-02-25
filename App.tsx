import { StatusBar } from 'expo-status-bar';
import { LoginScreen } from './src/screens/Login';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor='#5CE079' />
      <LoginScreen />
    </SafeAreaView>
  );
}
