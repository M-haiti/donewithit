import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListingsScreen from '../screens/ListingsScreen';
import ListingEditScreen from '../screens/ListingEditScreen';
import AccountScreen from '../screens/AccountScreen';
import LoginScreen from '../screens/LoginScreen';
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import NewListingButton from './NewListingButton';

import useNotifications from '../hooks/useNotifications';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    useNotifications(true)


    return (
        <Tab.Navigator>
            <Tab.Screen name='Feed' component={FeedNavigator} options={{
                tabBarIcon: ({ color, size }) =>
                    <MaterialCommunityIcons name='home' color={color} size={size}
                    />
            }} />
            <Tab.Screen
                name='ListingsEdit'
                component={ListingEditScreen}
                options={({ navigation }) => ({
                    tabBarButton: () => <NewListingButton onPress={() => navigation.navigate('ListingsEdit')} />,
                })}
            />
            <Tab.Screen name='AccountDetails' component={AccountNavigator} options={{
                tabBarIcon: ({ color, size }) =>
                    <MaterialCommunityIcons name='account' color={color} size={size}
                    />
            }} />
        </Tab.Navigator>
    )
}



export default AppNavigator;