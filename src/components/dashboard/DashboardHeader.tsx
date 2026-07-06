import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';

type DashboardHeaderProps = {
  message: string;
  subtitle: string;
  onNewJobPress: () => void;
}

export default function DashboardHeader({ message, subtitle, onNewJobPress }: DashboardHeaderProps) {
  return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>
            {message}
          </Text>

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        </View>

        <Pressable
          style={styles.button}
          onPress={onNewJobPress}
        >
          <Plus size={18} color="#FFF" />

          <Text style={styles.buttonText}>
            New Job
          </Text>
        </Pressable>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 24,
  },

  textContainer: {
    flex: 1,
    marginRight: 16,
  },

  greeting: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 15,
    lineHeight: 22,
    color: '#6B7280',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#16A34A',

    paddingHorizontal: 16,
    height: 44,

    borderRadius: 12,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 6,
  },
});
