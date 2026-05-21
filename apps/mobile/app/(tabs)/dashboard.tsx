import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { theme } from '@secure-attendance/ui';
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
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={{ gap: 24 }}>
          <PremiumTitle
            eyebrow="Home"
            title="Your attendance, live."
            subtitle="Monitor streaks, upcoming classes, and trust signals with a native-first layout designed for speed and clarity."
          />

          <PulseRing label="attendance" value={`${attendance.toFixed(1)}%`} progress={attendance} />

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
            <View className="w-[48%]"><MetricTile label="Attendance streak" value="12 days" tone="emerald" /></View>
            <View className="w-[48%]"><MetricTile label="Risk score" value={fraudAttempts > 10 ? 'Watch' : 'Low'} tone={fraudAttempts > 10 ? 'amber' : 'emerald'} /></View>
            <View className="w-[48%]"><MetricTile label="Active sessions" value={String(activeSessions)} tone="cyan" /></View>
            <View className="w-[48%]"><MetricTile label="Last check-in" value="2h ago" tone="rose" /></View>
          </View>

          <NativeSection title="Upcoming classes" action="Today">
            <View style={{ gap: 12 }}>
              {classes.map((course) => (
                <View key={course.title} style={{ borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.03)', padding: 16 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.text }}>{course.title}</Text>
                      <Text style={{ marginTop: 4, fontSize: 14, color: theme.colors.muted }}>{course.room}</Text>
                    </View>
                    <StatusPill tone="sky" label={course.time} />
                  </View>
                </View>
              ))}
            </View>
          </NativeSection>

          <NativeSection title="Quick scan access" action="Primary action">
            <PrimaryButton title="Open scanner" onPress={() => router.push('/(tabs)/scan' as never)} tone="sky" icon="qr-code" />
            <View style={{ marginTop: 16, flexDirection: 'row', gap: 12 }}>
              <Pressable onPress={() => router.push('/attendance-history' as never)} style={{ flex: 1, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 16, paddingVertical: 16 }}>
                <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '600', color: theme.colors.text }}>History</Text>
              </Pressable>
              <Pressable onPress={() => router.push('/notifications' as never)} style={{ flex: 1, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 16, paddingVertical: 16 }}>
                <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '600', color: theme.colors.text }}>Alerts</Text>
              </Pressable>
            </View>
          </NativeSection>

          <GlassCard>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.4, color: theme.colors.muted }}>Session state</Text>
                <Text style={{ marginTop: 8, fontSize: 18, fontWeight: '600', color: theme.colors.text }}>Trust verified</Text>
              </View>
              <StatusPill tone="emerald" label="online" />
            </View>
          </GlassCard>
        </View>
      </ScrollView>
    </Screen>
  );
}