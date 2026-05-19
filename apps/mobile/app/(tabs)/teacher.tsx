import { useQuery } from '@tanstack/react-query';
import { Text, View } from 'react-native';
import { getLatestSession } from '../../lib/api';

export default function TeacherScreen() {
  const latestSessionQuery = useQuery({ queryKey: ['latest-session'], queryFn: () => getLatestSession() });

  return (
    <View className="flex-1 bg-slate-950 px-5 pt-16">
      <Text className="text-3xl font-bold text-white">Teacher monitor</Text>
      <Text className="mt-2 text-slate-400">Create sessions, refresh QR, and watch live attendance.</Text>
      <View className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
        <Text className="text-lg font-semibold text-white">Session status</Text>
        <Text className="mt-2 text-slate-400">
          {latestSessionQuery.data ? 'Live session loaded from the API.' : 'Loading live attendance feed...'}
        </Text>
      </View>
    </View>
  );
}
