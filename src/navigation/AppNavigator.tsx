import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { linking } from './linking';
import { RootStackParamList } from './types';
import { AuthGuard } from './AuthGuard';

// Lazy-load screens to keep the initial bundle small
import { LazyScreen } from '../utils/LazyScreen';

const HomeScreen = LazyScreen(() => import('../pages/mobile/MobileLogin'));
const LoginScreen = LazyScreen(() => import('../pages/mobile/MobileLogin'));
const RegisterScreen = LazyScreen(() => import('../pages/mobile/MobileRegister'));
const SettingsScreen = LazyScreen(() => import('../pages/mobile/Settings'));
const PaymentHistoryScreen = LazyScreen(() => import('../pages/mobile/PaymentHistory'));

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * AppNavigator
 *
 * Root navigation container for TeachLink.  All screens are registered here
 * so that deep-linking (configured in `./linking`) can resolve any route from
 * a cold start.
 *
 * Auth-protected screens are wrapped by <AuthGuard> which redirects unauthenticated
 * users to the Login screen automatically.
 */
export default function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        {/* ── Public screens ─────────────────────────────────── */}
        <Stack.Screen name="Home" component={LoginScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />

        {/* ── Auth screens ───────────────────────────────────── */}
        <Stack.Screen
          name="Profile"
          children={() => (
            <AuthGuard>
              <PaymentHistoryScreen />
            </AuthGuard>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
