import { Tabs, router } from 'expo-router';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Pressable } from 'react-native';
import { mobileTabs } from '@secure-attendance/ui';
import { TabButton } from '../../components/experience';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const tabConfig = useMemo(() => mobileTabs, []);

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => {
        const activeRoute = props.state.routes[props.state.index]?.name ?? 'dashboard';

        return (
          <View style={{ paddingBottom: Math.max(insets.bottom, 10) + 8 }} className="border-t border-white/10 bg-[#06101d]/95 px-4 pt-3">
            <View className="flex-row items-end justify-between gap-2 rounded-[28px] border border-white/10 bg-white/5 px-2 py-2">
              {tabConfig.map((tab) => {
                if (tab.route.includes('/scan')) {
                  return (
                    <Pressable
                      key={tab.label}
                      onPress={() => router.push(tab.route as never)}
                      className="-mt-7 h-16 w-16 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-300 to-sky-400 shadow-lg shadow-cyan-950/40"
                    >
                      <Text className="text-2xl">⌁</Text>
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
