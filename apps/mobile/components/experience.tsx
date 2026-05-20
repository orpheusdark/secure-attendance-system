import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { Easing, interpolateColor, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export function Screen({ children }: { children: ReactNode }) {
  return <View className="flex-1 bg-[#020712] px-5 pt-4">{children}</View>;
}

export function PremiumTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <View className="space-y-3">
      <Text className="text-[11px] uppercase tracking-[0.45em] text-sky-300">{eyebrow}</Text>
      <Text className="text-4xl font-bold tracking-tight text-white">{title}</Text>
      <Text className="max-w-[32rem] text-sm leading-6 text-slate-300">{subtitle}</Text>
    </View>
  );
}

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <View className={`rounded-[28px] border border-white/10 bg-white/5 p-5 ${className}`}>{children}</View>;
}

export function MetricTile({ label, value, tone = 'sky' }: { label: string; value: string; tone?: 'sky' | 'cyan' | 'emerald' | 'amber' | 'rose' }) {
  const colors = {
    sky: 'text-sky-300',
    cyan: 'text-cyan-300',
    emerald: 'text-emerald-300',
    amber: 'text-amber-300',
    rose: 'text-rose-300',
  } as const;

  return (
    <GlassCard>
      <Text className="text-xs uppercase tracking-[0.35em] text-slate-500">{label}</Text>
      <Text className={`mt-3 text-3xl font-bold ${colors[tone]}`}>{value}</Text>
    </GlassCard>
  );
}

export function StatusPill({ label, tone = 'sky' }: { label: string; tone?: 'sky' | 'cyan' | 'emerald' | 'amber' | 'rose' }) {
  const tones = {
    sky: 'border-sky-400/20 bg-sky-400/10 text-sky-200',
    cyan: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200',
    emerald: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
    amber: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
    rose: 'border-rose-400/20 bg-rose-400/10 text-rose-200',
  } as const;

  return <View className={`rounded-full border px-3 py-1.5 ${tones[tone]}`}><Text className="text-[11px] uppercase tracking-[0.3em]">{label}</Text></View>;
}

export function PrimaryButton({ title, onPress, tone = 'sky', icon }: { title: string; onPress: () => void; tone?: 'sky' | 'cyan' | 'emerald' | 'amber' | 'rose'; icon?: keyof typeof Ionicons.glyphMap }) {
  const buttonTone = {
    sky: 'bg-sky-400',
    cyan: 'bg-cyan-300',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
  } as const;

  return (
    <Pressable onPress={onPress} className="overflow-hidden rounded-[20px]">
      <View className={`flex-row items-center justify-center gap-3 rounded-[20px] px-5 py-4 ${buttonTone[tone]}`}>
        {icon ? <Ionicons name={icon} size={18} color="#021019" /> : null}
        <Text className="text-base font-bold text-slate-950">{title}</Text>
      </View>
    </Pressable>
  );
}

export function PulseRing({ label, value, progress }: { label: string; value: string; progress: number }) {
  const pulse = useSharedValue(0);

  pulse.value = withRepeat(withTiming(1, { duration: 2400, easing: Easing.inOut(Easing.ease) }), -1, true);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 0.96 + pulse.value * 0.06 }],
    borderColor: interpolateColor(pulse.value, [0, 1], ['rgba(56,189,248,0.25)', 'rgba(52,211,153,0.5)']),
  }));

  return (
    <View className="items-center justify-center">
      <Animated.View style={animatedStyle} className="h-44 w-44 items-center justify-center rounded-full border bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),rgba(8,15,29,0.95)_68%)]">
        <Text className="text-4xl font-bold text-white">{value}</Text>
        <Text className="mt-1 text-[11px] uppercase tracking-[0.35em] text-slate-400">{label}</Text>
      </Animated.View>
      <View className="mt-4 h-2 w-56 overflow-hidden rounded-full bg-slate-800">
        <View className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" style={{ width: `${progress}%` }} />
      </View>
    </View>
  );
}

export function NativeSection({ title, action, children }: { title: string; action?: string; children: ReactNode }) {
  return (
    <GlassCard className="mt-4">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-white">{title}</Text>
        {action ? <Text className="text-xs uppercase tracking-[0.35em] text-slate-500">{action}</Text> : null}
      </View>
      {children}
    </GlassCard>
  );
}

export function TabButton({ label, icon, active, onPress, compact = false }: { label: string; icon: keyof typeof Ionicons.glyphMap; active: boolean; onPress: () => void; compact?: boolean }) {
  return (
    <Pressable onPress={onPress} className={`items-center justify-center ${compact ? 'px-3 py-2' : 'flex-1 py-3'}`}>
      <Ionicons name={icon} size={active ? 24 : 20} color={active ? '#67e8f9' : '#94a3b8'} />
      {!compact ? <Text className={`mt-1 text-[11px] ${active ? 'text-cyan-300' : 'text-slate-500'}`}>{label}</Text> : null}
    </Pressable>
  );
}