import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#22d3ee' }}>
      <Tabs.Screen name="dashboard" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="grid" color={color} size={size} /> }} />
      <Tabs.Screen name="scan" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="qr-code" color={color} size={size} /> }} />
      <Tabs.Screen name="teacher" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="school" color={color} size={size} /> }} />
      <Tabs.Screen name="notifications" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="notifications" color={color} size={size} /> }} />
      <Tabs.Screen name="settings" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} /> }} />
    </Tabs>
  );
}
