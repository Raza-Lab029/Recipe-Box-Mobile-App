import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import { account } from '../lib/appwriteConfig';
import { addRecipe } from '../lib/recipeService';

export default function AddRecipe() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddRecipe = async () => {
    if (!title || !ingredients || !steps) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }
    setLoading(true);
    try {
      const session = await account.get();
      const userId = session.$id;

      await addRecipe(title, ingredients, steps, userId);

      Alert.alert('Success', 'Recipe added!');
      setTitle('');
      setIngredients('');
      setSteps('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add recipe.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Recipe Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter recipe title"
      />

      <Text style={styles.label}>Ingredients</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        multiline
        numberOfLines={4}
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="Enter ingredients"
      />

      <Text style={styles.label}>Steps</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        multiline
        numberOfLines={6}
        value={steps}
        onChangeText={setSteps}
        placeholder="Enter cooking steps"
      />

      <Button title={loading ? 'Adding...' : 'Add Recipe'} onPress={handleAddRecipe} disabled={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  multiline: {
    textAlignVertical: 'top',
  },
});
