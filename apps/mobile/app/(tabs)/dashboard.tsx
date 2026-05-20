import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { getAnalyticsOverview } from '../../lib/api';
import { GlassCard, MetricTile, NativeSection, PrimaryButton, PremiumTitle, PulseRing, Screen, StatusPill } from '../../components/experience';

const classes = [
  { title: 'Advanced UI Systems', time: '08:00', room: 'Studio 4' },
  { title: 'Security Architecture', time: '11:30', room: 'Hall B' },
  { title: 'Product Analytics', time: '14:00', room: 'Lab 2' },
];

export default function DashboardScreen() {
  const overviewQuery = useQuery({ queryKey: ['mobile-overview'], queryFn: getAnalyticsOverview });

  const attendance = overviewQuery.data?.attendanceRate ?? 96.2;
  const fraudAttempts = overviewQuery.data?.fraudAttempts ?? 12;
  const activeSessions = (overviewQuery.data?.suspiciousSessions ?? 4) + 4;

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
        <View className="space-y-6">
          <PremiumTitle
            eyebrow="Home"
            title="Your attendance, live."
            subtitle="Monitor streaks, upcoming classes, and trust signals with a native-first layout designed for speed and clarity."
          />

          <PulseRing label="attendance" value={`${attendance.toFixed(1)}%`} progress={attendance} />

          <View className="flex-row flex-wrap justify-between gap-3">
            <View className="w-[48%]"><MetricTile label="Attendance streak" value="12 days" tone="emerald" /></View>
            <View className="w-[48%]"><MetricTile label="Risk score" value={fraudAttempts > 10 ? 'Watch' : 'Low'} tone={fraudAttempts > 10 ? 'amber' : 'emerald'} /></View>
            <View className="w-[48%]"><MetricTile label="Active sessions" value={String(activeSessions)} tone="cyan" /></View>
            <View className="w-[48%]"><MetricTile label="Last check-in" value="2h ago" tone="rose" /></View>
          </View>

          <NativeSection title="Upcoming classes" action="Today">
            <View className="space-y-3">
              {classes.map((course) => (
                <View key={course.title} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-base font-semibold text-white">{course.title}</Text>
                      <Text className="mt-1 text-sm text-slate-400">{course.room}</Text>
                    </View>
                    <StatusPill tone="sky" label={course.time} />
                  </View>
                </View>
              ))}
            </View>
          </NativeSection>

          <NativeSection title="Quick scan access" action="Primary action">
            <PrimaryButton title="Open scanner" onPress={() => router.push('/(tabs)/scan' as never)} tone="sky" icon="qr-code" />
            <View className="mt-4 flex-row gap-3">
              <Pressable onPress={() => router.push('/attendance-history' as never)} className="flex-1 rounded-[18px] border border-white/10 bg-white/5 px-4 py-4">
                <Text className="text-center text-sm font-semibold text-white">History</Text>
              </Pressable>
              <Pressable onPress={() => router.push('/notifications' as never)} className="flex-1 rounded-[18px] border border-white/10 bg-white/5 px-4 py-4">
                <Text className="text-center text-sm font-semibold text-white">Alerts</Text>
              </Pressable>
            </View>
          </NativeSection>

          <GlassCard>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-sm uppercase tracking-[0.35em] text-slate-500">Session state</Text>
                <Text className="mt-2 text-lg font-semibold text-white">Trust verified</Text>
              </View>
              <StatusPill tone="emerald" label="online" />
            </View>
          </GlassCard>
        </View>
      </ScrollView>
    </Screen>
  );
}