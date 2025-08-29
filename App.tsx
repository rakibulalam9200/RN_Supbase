/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  // useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductList from './src/screens/ProductList';
import AddProduct from './src/screens/AddProduct';
import EditProduct from './src/screens/EditProduct';

export type RootStackParamList = {
  ProductList: undefined;
  AddProduct: undefined;
  EditProduct: { product: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  // const safeAreaInsets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{ title: 'Products' }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{ title: 'Add Product' }}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{ title: 'Edit Product' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
