import { Text, View } from 'react-native';

export default function ScanScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-950 px-6">
      <View className="h-72 w-72 rounded-[32px] border border-cyan-300/20 bg-cyan-400/10" />
      <Text className="mt-8 text-xl font-semibold text-white">Dynamic QR scanner</Text>
      <Text className="mt-2 text-center text-slate-400">
        This screen is wired for rolling QR, location capture, motion checks, and selfie verification.
      </Text>
    </View>
  );
}
