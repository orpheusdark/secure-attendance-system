import { useQuery } from '@tanstack/react-query';
import { Text, View } from 'react-native';
import { getNotifications } from '../../lib/api';
import { useEffect, useState } from 'react';
import { loadSession } from '../../lib/session';

export default function NotificationsScreen() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    void loadSession().then((session) => setUserId(session?.user.id ?? null));
  }, []);

  const notificationsQuery = useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => getNotifications(userId ?? ''),
    enabled: Boolean(userId),
  });

  return (
    <View className="flex-1 bg-slate-950 px-5 pt-16">
      <Text className="text-3xl font-bold text-white">Notifications</Text>
      <View className="mt-6 gap-4">
        {notificationsQuery.isLoading ? (
          <View className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <Text className="font-semibold text-white">Loading notifications...</Text>
          </View>
        ) : null}
        {(notificationsQuery.data ?? []).map((notification) => (
          <View key={notification.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <Text className="font-semibold text-white">{notification.title}</Text>
            <Text className="mt-1 text-slate-400">{notification.message}</Text>
          </View>
        ))}
        {notificationsQuery.data?.length === 0 ? (
          <View className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <Text className="font-semibold text-white">No notifications yet</Text>
            <Text className="mt-1 text-slate-400">Attendance reminders and fraud alerts will appear here.</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
