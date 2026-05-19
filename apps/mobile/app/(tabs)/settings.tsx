import { Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-slate-950 px-5 pt-16">
      <Text className="text-3xl font-bold text-white">Settings</Text>
      <View className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
        <Text className="text-white">Biometric unlock</Text>
        <Text className="mt-2 text-slate-400">Device binding, secure storage, and session controls live here.</Text>
      </View>
    </View>
  );
}
