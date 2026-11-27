import { Link } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
        <Pressable onPress={() => router.push('/matches')}>
          <Text>Go to matches</Text>
        </Pressable>
    </View>
  );
}