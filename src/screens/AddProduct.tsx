import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { addProduct, uploadImage } from '../api/products';

type Props = NativeStackScreenProps<RootStackParamList, 'AddProduct'>;

export default function AddProduct({ navigation }: Props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const handleAdd = async () => {
    try {
      let imageUrl = '';
      if (imageUri) {
        imageUrl = await uploadImage(imageUri);
      }
      await addProduct(name, parseFloat(price), description, imageUrl);
      navigation.goBack();
    } catch (e) {
      console.log(e, 'error');
      Alert.alert('Error adding product');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Pick Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Add Product" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 6,
  },
  image: { width: 120, height: 120, marginVertical: 12, borderRadius: 8 },
});
