import { Text, View, StyleSheet } from 'react-native';

const MATCHES = [
  { id: '1', name: 'Amaka', age: 24, score: 87 },
  { id: '2', name: 'Tunde', age: 27, score: 79 },
  { id: '3', name: 'Chioma', age: 23, score: 72 },
];

export default function Matches() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your matches</Text>
      {MATCHES.map((m) => (
        <Text key={m.id} style={styles.name}>
          {m.name}, {m.age} - {m.score}% match
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: 'white' },
  title: { fontSize: 28, fontWeight: 'bold', color: 'black', marginBottom: 16 },
  name: { fontSize: 18, color: 'black', marginBottom: 8 },
});