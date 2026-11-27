import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AboutScreen() {
  const router = useRouter();

  const [mainPhoto, setMainPhoto] = useState<string | null>(null);
  const [photo1, setPhoto1] = useState<string | null>(null);
  const [photo2, setPhoto2] = useState<string | null>(null);
  const [photo3, setPhoto3] = useState<string | null>(null);
  const [bio, setBio] = useState('');

  const pickImage = async (setPhoto: (uri: string) => void) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow access to your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleComplete = () => {
    if (!mainPhoto) {
      Alert.alert('Missing Photo', 'Please upload your main display photo.');
      return;
    }
    if (bio.trim().length < 10) {
      Alert.alert('Bio too short', 'Please write a short bio (at least 10 characters).');
      return;
    }

    Alert.alert('Success', 'Profile completed!', [
      { text: 'OK', onPress: () => router.replace('/') },
    ]);
  };

  const renderPhotoBox = (
    photo: string | null,
    setPhoto: (uri: string) => void,
    isMain = false
  ) => {
    return (
      <TouchableOpacity
        style={[styles.photoBox, isMain && styles.mainPhotoBox]}
        onPress={() => pickImage(setPhoto)}
        activeOpacity={0.7}
      >
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <View style={styles.placeholderContent}>
            <Text style={styles.uploadIcon}>🖼️</Text>
            <Text style={styles.uploadArrow}>↑</Text>
          </View>
        )}
      </TouchableOpacity>
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
            <View style={[styles.circle, styles.completedCircle]}>
              <Text style={styles.check}>✓</Text>
            </View>
            <Text style={styles.progressLabel}>Preference</Text>
          </View>

          <View style={styles.progressItem}>
            <View style={[styles.circle, styles.activeCircle]}>
              <Text style={styles.activeNumber}>3</Text>
            </View>
            <Text style={[styles.progressLabel, styles.activeLabel]}>About</Text>
          </View>
        </View>
      </View>

      <Text style={styles.title}>A Little More About You</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Photo */}
        <Text style={styles.sectionTitle}>Upload Your Photos</Text>

        <View style={styles.mainPhotoContainer}>
          {renderPhotoBox(mainPhoto, setMainPhoto, true)}
          <Text style={styles.photoLabel}>Your main display photo</Text>
        </View>

        {/* Extra Photos */}
        <View style={styles.extraPhotosRow}>
          <View style={styles.extraPhotoItem}>
            {renderPhotoBox(photo1, setPhoto1)}
            <Text style={styles.smallLabel}>Img 1</Text>
          </View>
          <View style={styles.extraPhotoItem}>
            {renderPhotoBox(photo2, setPhoto2)}
            <Text style={styles.smallLabel}>Img 2</Text>
          </View>
          <View style={styles.extraPhotoItem}>
            {renderPhotoBox(photo3, setPhoto3)}
            <Text style={styles.smallLabel}>Img 3</Text>
          </View>
        </View>

        {/* Bio */}
        <Text style={styles.sectionTitle}>Bio</Text>
        <TextInput
          style={styles.bioInput}
          placeholder="Enter a short bio (300 max)"
          placeholderTextColor="#999"
          multiline
          maxLength={300}
          value={bio}
          onChangeText={setBio}
          textAlignVertical="top"
        />
        <Text style={styles.charCount}>{bio.length}/300</Text>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.completeButtonText}>Complete</Text>
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
    fontSize: 20,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 10,
  },
  mainPhotoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photoBox: {
    width: 70,
    height: 70,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#cce0e0',
    backgroundColor: '#f7fafa',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mainPhotoBox: {
    width: 140,
    height: 140,
    borderRadius: 16,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  placeholderContent: {
    alignItems: 'center',
  },
  uploadIcon: {
    fontSize: 28,
    opacity: 0.5,
  },
  uploadArrow: {
    fontSize: 16,
    color: '#0d7377',
    marginTop: -8,
  },
  photoLabel: {
    marginTop: 8,
    fontSize: 13,
    color: '#666',
  },
  extraPhotosRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 25,
  },
  extraPhotoItem: {
    alignItems: 'center',
  },
  smallLabel: {
    marginTop: 6,
    fontSize: 12,
    color: '#888',
  },
  bioInput: {
    borderWidth: 1,
    borderColor: '#0d7377',
    borderRadius: 12,
    padding: 14,
    minHeight: 100,
    fontSize: 15,
    color: '#222',
    backgroundColor: '#fff',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#999',
    marginTop: 6,
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
  completeButton: {
    backgroundColor: '#0d7377',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});