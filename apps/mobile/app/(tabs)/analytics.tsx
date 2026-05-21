import { ScrollView, Text, View } from 'react-native';
import { GlassCard, MetricTile, NativeSection, PremiumTitle, Screen } from '../../components/experience';
import { theme } from '@secure-attendance/ui';

const weekly = [92, 95, 89, 97, 96, 94, 98];

export default function AnalyticsScreen() {
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
        <View className="space-y-6">
          <PremiumTitle eyebrow="Analytics" title="Attendance intelligence." subtitle="Compare trends, risk, and weekly performance in a chart-like native layout." />

          <View className="flex-row flex-wrap justify-between gap-3">
            <View className="w-[48%]"><MetricTile label="Weekly average" value="95%" tone="emerald" /></View>
            <View className="w-[48%]"><MetricTile label="Risk prediction" value="Low" tone="amber" /></View>
          </View>

          <NativeSection title="Weekly trend" action="7 days">
            <View className="flex-row items-end gap-2">
              {weekly.map((value, index) => (
                <View key={index} className="flex-1 items-center gap-2">
                  <View style={{ height: 192, width: '100%', justifyContent: 'flex-end', overflow: 'hidden', borderRadius: 16, backgroundColor: 'rgba(15,23,42,0.8)' }}>
                    <View style={{ borderRadius: 16, backgroundColor: theme.colors.primary, height: `${value}%` }} />
                  </View>
                  <Text style={{ fontSize: 12, color: theme.colors.muted }}>{index + 1}</Text>
                </View>
              ))}
            </View>
          </NativeSection>

          <GlassCard>
            <Text style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1.4, color: theme.colors.muted }}>Class comparison</Text>
            <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '600', color: theme.colors.text }}>Engineering leads the week. Business needs attention.</Text>
          </GlassCard>
        </View>
      </ScrollView>
    </Screen>
  );
}