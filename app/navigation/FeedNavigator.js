import React from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListingDetailsScreen from '../components/ListingDetailsScreen';
import ListingsScreen from '../screens/ListingsScreen';

const Stack = createNativeStackNavigator()

const FeedNavigator = () => (

    <Stack.Navigator mode="modal" screenOptions={{headerShown:false}}>
        <Stack.Screen name='Listings' component={ListingsScreen} />
        <Stack.Screen name='ListingDetails' component={ListingDetailsScreen} />
    </Stack.Navigator>
)

export default FeedNavigator;