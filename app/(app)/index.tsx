import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatCard from '@/src/components/dashboard/StatCard';
import { CalendarDays } from 'lucide-react-native';
import DashboardHeader from '@/src/components/dashboard/DashboardHeader';
import { useAuth } from '@/src/hooks/useAuth';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const handleNewJobPress = () => {
    router.push('/jobs/new')
  }

  return (
    <SafeAreaView style={styles.container}>
      <DashboardHeader
        message={`Hello, ${user.firstName}!`}
        subtitle="Here's what's happening today..."
        onNewJobPress={handleNewJobPress}
      />

      <View style={styles.statsRow}>
        <StatCard
          title="Today's Jobs"
          value={3}
          subtitle="2 Completed"
          icon={<CalendarDays size={22} color="#FFF" />}
          iconColor="#16A34A"
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#111',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
