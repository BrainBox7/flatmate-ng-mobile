import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ageRanges = ['18-24', '25-30', '31-35', '36-40', '41+'];
const billPreferences = ['Split equally', 'I pay more', 'Roommate pays more', 'Flexible'];
const cleanlinessLevels = ['Very clean', 'Clean', 'Average', 'Relaxed'];
const cookingFrequency = ['Daily', 'Few times a week', 'Rarely', 'Never'];
const kitchenHabits = ['Wash immediately', 'Wash later', 'Shared responsibility'];
const privacyStyles = ['Very private', 'Balanced', 'Social / Open'];
const noiseTolerance = ['Very quiet', 'Moderate', 'I don’t mind noise'];

export default function LifestyleScreen() {
  const router = useRouter();

  const [ageRange, setAgeRange] = useState('');  
  const [billPreference, setBillPreference] = useState('');
  const [cleanliness, setCleanliness] = useState('');
  const [cooking, setCooking] = useState('');
  const [kitchen, setKitchen] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [noise, setNoise] = useState('');

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const renderDropdown = (
    label: string,
    value: string,
    options: string[],
    onSelect: (val: string) => void,
    key: string
  ) => {
    const isOpen = openDropdown === key;

    return (
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setOpenDropdown(isOpen ? null : key)}
          activeOpacity={0.7}
        >
          <Text style={[styles.dropdownText, !value && styles.placeholder]}>
            {value || label}
          </Text>
          <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.optionsBox}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => {
                  onSelect(option);
                  setOpenDropdown(null);
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header / Progress */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.progressItem}>
            <View style={[styles.circle, styles.completedCircle]}>
              <Text style={styles.check}>✓</Text>
            </View>
            <Text style={styles.progressLabel}>Plans</Text>
          </View>

          <View style={styles.progressItem}>
            <View style={[styles.circle, styles.activeCircle]}>
              <Text style={styles.activeNumber}>2</Text>
            </View>
            <Text style={[styles.progressLabel, styles.activeLabel]}>Preference</Text>
          </View>

          <View style={styles.progressItem}>
            <View style={styles.circle}>
              <Text style={styles.number}>3</Text>
            </View>
            <Text style={styles.progressLabel}>About</Text>
          </View>
        </View>
      </View>

      <Text style={styles.title}>Lifestyle</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section 1 */}
        <Text style={styles.sectionTitle}>
          Basics and Shared Expenses <Text style={styles.required}>*</Text>
        </Text>
        {renderDropdown('--Your age range--', ageRange, ageRanges, setAgeRange, 'age')}
        {renderDropdown('--Bill payment preference--', billPreference, billPreferences, setBillPreference, 'bill')}

        {/* Section 2 */}
        <Text style={styles.sectionTitle}>
          Home Habits and Cleanliness <Text style={styles.required}>*</Text>
        </Text>
        {renderDropdown('--Cleanliness level--', cleanliness, cleanlinessLevels, setCleanliness, 'clean')}
        {renderDropdown('--Cooking frequency--', cooking, cookingFrequency, setCooking, 'cook')}
        {renderDropdown('--Kitchen and dish habits--', kitchen, kitchenHabits, setKitchen, 'kitchen')}

        {/* Section 3 */}
        <Text style={styles.sectionTitle}>
          Social, Guest and Lifestyle <Text style={styles.required}>*</Text>
        </Text>
        {renderDropdown('--Privacy and social style--', privacy, privacyStyles, setPrivacy, 'privacy')}
        {renderDropdown('--Noise tolerance--', noise, noiseTolerance, setNoise, 'noise')}

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push('/about')}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  backArrow: {
    fontSize: 24,
    color: '#333',
    marginRight: 15,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  progressItem: {
    alignItems: 'center',
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  completedCircle: {
    backgroundColor: '#0d7377',
    borderColor: '#0d7377',
  },
  activeCircle: {
    borderColor: '#0d7377',
    borderWidth: 2,
  },
  check: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeNumber: {
    color: '#0d7377',
    fontWeight: 'bold',
  },
  number: {
    color: '#999',
  },
  progressLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activeLabel: {
    color: '#0d7377',
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 15,
    color: '#222',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginTop: 18,
    marginBottom: 10,
  },
  required: {
    color: '#e74c3c',
  },
  dropdownContainer: {
    marginBottom: 12,
    zIndex: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#0d7377',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 15,
    color: '#222',
  },
  placeholder: {
    color: '#999',
  },
  arrow: {
    fontSize: 12,
    color: '#666',
  },
  optionsBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 15,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    borderWidth: 1.5,
    borderColor: '#0d7377',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  backButtonText: {
    color: '#0d7377',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#0d7377',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 36,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});