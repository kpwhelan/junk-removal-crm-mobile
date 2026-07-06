import { ReactNode } from 'react';
import { statCardStyles } from '@/src/styles/statCardStyles';
import { Pressable, View, Text} from 'react-native';

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  iconColor: string;
  onPress: () => void;
}

export default function StatCard({title, value, subtitle, icon, iconColor, onPress}: StatCardProps) {
  return (
    <Pressable style={statCardStyles.card}>
      <View style={[statCardStyles.iconContainer, {backgroundColor: iconColor}]}>
        {icon}
      </View>

      <Text style={statCardStyles.title}>
        {title}
      </Text>

      <Text style={statCardStyles.value}>
        {value}
      </Text>

      {subtitle && (
        <Text style={statCardStyles.subtitle}>
          {subtitle}
        </Text>
      )}
    </Pressable>
  )
}
