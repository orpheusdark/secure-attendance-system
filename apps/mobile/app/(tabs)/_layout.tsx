import { Tabs, router } from 'expo-router';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Pressable } from 'react-native';
import { mobileTabs } from '@secure-attendance/ui';
import { TabButton } from '../../components/experience';
import { theme } from '@secure-attendance/ui';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const tabConfig = useMemo(() => mobileTabs, []);

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => {
        const activeRoute = props.state.routes[props.state.index]?.name ?? 'dashboard';

        return (
          <View style={{ paddingBottom: Math.max(insets.bottom, 10) + 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', backgroundColor: theme.colors.background }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8, borderRadius: 28, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 8, paddingVertical: 8, marginHorizontal: 16, marginTop: 12 }}>
              {tabConfig.map((tab) => {
                if (tab.route.includes('/scan')) {
                  return (
                    <Pressable
                      key={tab.label}
                      onPress={() => router.push(tab.route as never)}
                      style={{ marginTop: -28, height: 64, width: 64, alignItems: 'center', justifyContent: 'center', borderRadius: 999, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', backgroundColor: theme.colors.primary, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 18, elevation: 6 }}
                    >
                      <Text style={{ fontSize: 24, color: '#fff' }}>⌁</Text>
                    </Pressable>
                  );
                }

                return (
                  <TabButton
                    key={tab.label}
                    label={tab.label}
                    icon={tab.icon as never}
                    active={activeRoute === tab.route.split('/').pop()}
                    onPress={() => router.push(tab.route as never)}
                    compact={tab.label === 'Profile'}
                  />
                );
              })}
            </View>
          </View>
        );
      }}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Home' }} />
      <Tabs.Screen name="scan" options={{ title: 'Scan' }} />
      <Tabs.Screen name="analytics" options={{ title: 'Analytics' }} />
      <Tabs.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}
