import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';

const backgroundImage = {
  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-lcgN3XXlxQAvtJw-DzeleKfrV1rvU9r6w&s',
};

export default function ProfileScreen() {
  const [name, setName] = useState('Kimlie Dan Raza');
  const [email] = useState('kimlie@example.com');
  const [bio, setBio] = useState('A passionate foodie and recipe lover.');

  const handleSave = () => {
    Alert.alert('Profile Saved', 'Your profile has been updated.');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk_9JmgGPZ_GxYkXndH_UwmxH2awIY2iYEOQ&s',
          }}
          style={styles.avatar}
        />
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#eee' }]}
          value={email}
          editable={false}
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={bio}
          onChangeText={setBio}
          multiline
          placeholder="Write something about yourself"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(91, 149, 235, 0.85)',
    flexGrow: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 40,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
