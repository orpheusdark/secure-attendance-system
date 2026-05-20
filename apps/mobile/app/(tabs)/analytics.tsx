import { ScrollView, Text, View } from 'react-native';
import { GlassCard, MetricTile, NativeSection, PremiumTitle, Screen } from '../../components/experience';

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
                  <View className="h-48 w-full justify-end overflow-hidden rounded-2xl bg-slate-800/80">
                    <View className="rounded-2xl bg-gradient-to-t from-sky-500 to-emerald-400" style={{ height: `${value}%` }} />
                  </View>
                  <Text className="text-xs text-slate-500">{index + 1}</Text>
                </View>
              ))}
            </View>
          </NativeSection>

          <GlassCard>
            <Text className="text-sm uppercase tracking-[0.35em] text-slate-500">Class comparison</Text>
            <Text className="mt-2 text-base font-semibold text-white">Engineering leads the week. Business needs attention.</Text>
          </GlassCard>
        </View>
      </ScrollView>
    </Screen>
  );
}