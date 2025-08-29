/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { deleteProduct, getProducts } from '../api/products';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductList'>;

export default function ProductList({ navigation }: Props) {
  const [products, setProducts] = useState<any[]>([]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadProducts);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (e) {
      Alert.alert('Error deleting product');
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Add Product"
        onPress={() => navigation.navigate('AddProduct')}
      />

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('EditProduct', { product: item })
            }
          >
            {item.image_url ? (
              <Image source={{ uri: item.image_url }} style={styles.image} />
            ) : (
              <View style={styles.placeholder} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.name}</Text>
              <Text>${item.price}</Text>
              <Text>{item.description}</Text>
            </View>
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  image: { width: 60, height: 60, marginRight: 12, borderRadius: 8 },
  placeholder: {
    width: 60,
    height: 60,
    marginRight: 12,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
});
