import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { updateProduct, uploadImage } from '../api/products';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProduct'>;

export default function EditProduct({ route, navigation }: Props) {
  const { product } = route.params;
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [description, setDescription] = useState(product.description);
  const [imageUri, setImageUri] = useState<string | null>(product.image_url);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const handleUpdate = async () => {
    try {
      let imageUrl = product.image_url;
      if (imageUri && imageUri !== product.image_url) {
        imageUrl = await uploadImage(imageUri);
      }
      await updateProduct(product.id, {
        name,
        price: parseFloat(price),
        description,
        image_url: imageUrl,
      });
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error updating product');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Change Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Update Product" onPress={handleUpdate} />
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
