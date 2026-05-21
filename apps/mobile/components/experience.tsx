import { Ionicons } from '@expo/vector-icons';
import { ReactNode, useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import { theme } from '@secure-attendance/ui';

export function Screen({ children }: { children: ReactNode }) {
  return <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: 20, paddingTop: 16 }}>{children}</View>;
}

export function PremiumTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.8, color: theme.colors.live }}>{eyebrow}</Text>
      <Text style={{ fontSize: 28, fontWeight: '700', color: theme.colors.text }}>{title}</Text>
      <Text style={{ maxWidth: 512, fontSize: 14, lineHeight: 22, color: theme.colors.muted }}>{subtitle}</Text>
    </View>
  );
}

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <View className={className} style={{ borderRadius: 28, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.03)', padding: 20 }}>{children}</View>;
}

export function MetricTile({ label, value, tone = 'sky' }: { label: string; value: string; tone?: 'sky' | 'cyan' | 'emerald' | 'amber' | 'rose' }) {
  const colors = {
    sky: theme.colors.live,
    cyan: theme.colors.live,
    emerald: theme.colors.success,
    amber: theme.colors.warning,
    rose: theme.colors.danger,
  } as const;

  return (
    <GlassCard>
      <Text style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.7, color: theme.colors.muted }}>{label}</Text>
      <Text style={{ marginTop: 12, fontSize: 30, fontWeight: '700', color: colors[tone] }}>{value}</Text>
    </GlassCard>
  );
}

export function StatusPill({ label, tone = 'sky' }: { label: string; tone?: 'sky' | 'cyan' | 'emerald' | 'amber' | 'rose' }) {
  const toneMap: Record<'sky' | 'cyan' | 'emerald' | 'amber' | 'rose', { bg: string; color: string }> = {
    sky: { bg: theme.colors.primary + '33', color: theme.colors.primary },
    cyan: { bg: theme.colors.live + '33', color: theme.colors.live },
    emerald: { bg: theme.colors.success + '22', color: theme.colors.success },
    amber: { bg: theme.colors.warning + '22', color: theme.colors.warning },
    rose: { bg: theme.colors.danger + '22', color: theme.colors.danger },
  };

  const toneStyle = toneMap[tone];
  return (
    <View style={{ borderRadius: 999, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', paddingHorizontal: 12, paddingVertical: 6, backgroundColor: toneStyle.bg }}>
      <Text style={{ fontSize: 11, letterSpacing: 0.6, color: toneStyle.color, textTransform: 'uppercase' }}>{label}</Text>
    </View>
  );
}

export function PrimaryButton({ title, onPress, tone = 'sky', icon }: { title: string; onPress: () => void; tone?: 'sky' | 'cyan' | 'emerald' | 'amber' | 'rose'; icon?: keyof typeof Ionicons.glyphMap }) {
  const toneMap: Record<string, string> = {
    sky: theme.colors.primary,
    cyan: theme.colors.live,
    emerald: theme.colors.success,
    amber: theme.colors.warning,
    rose: theme.colors.danger,
  };

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={title} style={{ overflow: 'hidden', borderRadius: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 14, backgroundColor: toneMap[tone] }}>
        {icon ? <Ionicons name={icon} size={18} color="#021019" /> : null}
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#021019' }}>{title}</Text>
      </View>
    </Pressable>
  );
}

export function PulseRing({ label, value, progress }: { label: string; value: string; progress: number }) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [pulse]);

  const animatedStyle = {
    transform: [
      {
        scale: pulse.interpolate({
          inputRange: [0, 1],
          outputRange: [0.96, 1.02],
        }),
      },
    ],
  } as const;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={[animatedStyle, { height: 176, width: 176, alignItems: 'center', justifyContent: 'center', borderRadius: 88, borderWidth: 1, borderColor: theme.colors.primary }]}>
        <Text style={{ fontSize: 36, fontWeight: '700', color: '#fff' }}>{value}</Text>
        <Text style={{ marginTop: 4, fontSize: 11, letterSpacing: 0.6, color: '#94a3b8', textTransform: 'uppercase' }}>{label}</Text>
      </Animated.View>
      <View style={{ marginTop: 12, height: 8, width: 224, overflow: 'hidden', borderRadius: 999, backgroundColor: '#0b1220' }}>
        <View style={{ height: '100%', borderRadius: 999, backgroundColor: theme.colors.primary, width: `${progress}%` }} />
      </View>
    </View>
  );
}

export function NativeSection({ title, action, children }: { title: string; action?: string; children: ReactNode }) {
  return (
    <GlassCard className="mt-4">
      <View style={{ marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.text }}>{title}</Text>
        {action ? <Text style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6, color: theme.colors.muted }}>{String(action)}</Text> : null}
      </View>
      {children}
    </GlassCard>
  );
}

export function TabButton({ label, icon, active, onPress, compact = false }: { label: string; icon: keyof typeof Ionicons.glyphMap; active: boolean; onPress: () => void; compact?: boolean }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ selected: active }} style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: compact ? 12 : undefined, paddingVertical: compact ? 8 : 12, flex: compact ? undefined : 1 }}>
      <Ionicons name={icon} size={active ? 24 : 20} color={active ? theme.colors.live : theme.colors.muted} />
      {!compact ? <Text style={{ marginTop: 6, fontSize: 11, color: active ? theme.colors.live : theme.colors.muted }}>{label}</Text> : null}
    </Pressable>
  );
}