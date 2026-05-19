import { useQuery } from '@tanstack/react-query';
import { Text, View } from 'react-native';
import { getAnalyticsOverview } from '../../lib/api';

const stats = [
  { label: 'Attendance rate', value: '96.2%' },
  { label: 'Fraud alerts', value: '12' },
  { label: 'Active sessions', value: '4' },
  { label: 'Risk score', value: 'Low' },
];

export default function DashboardScreen() {
  const overviewQuery = useQuery({ queryKey: ['analytics-overview'], queryFn: getAnalyticsOverview });

  const renderedStats = overviewQuery.data
    ? [
        { label: 'Attendance rate', value: `${overviewQuery.data.attendanceRate}%` },
        { label: 'Fraud alerts', value: String(overviewQuery.data.fraudAttempts) },
        { label: 'Active sessions', value: String(overviewQuery.data.suspiciousSessions + 4) },
        { label: 'Risk score', value: overviewQuery.data.fraudAttempts > 10 ? 'Watch' : 'Low' },
      ]
    : stats;

  return (
    <View className="flex-1 bg-slate-950 px-5 pt-16">
      <Text className="text-3xl font-bold text-white">Student dashboard</Text>
      <Text className="mt-2 text-slate-400">Attendance, risk, and reminders in one place.</Text>
      <View className="mt-6 flex-row flex-wrap gap-3">
        {renderedStats.map((stat) => (
          <View key={stat.label} className="w-[48%] rounded-3xl border border-white/10 bg-white/5 p-4">
            <Text className="text-slate-400">{stat.label}</Text>
            <Text className="mt-2 text-2xl font-bold text-white">{stat.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
