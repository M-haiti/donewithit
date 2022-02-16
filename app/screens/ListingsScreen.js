import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Card from '../components/Card';
import Screen from "../components/Screen";
import colors from '../config/colors';
import routes from '../navigation/routes';
import listingsApi from '../api/listings'
import Button from '../components/AppButton'
import AppText from '../components/AppText';
import ActivityIndicator from '../components/ActivityIndicator';
import useApi from '../hooks/useApi';

function ListingsScreen({ navigation }) {
    const getListingsApi = useApi(listingsApi.getListings)

    useEffect(() => {
        getListingsApi.request();
    }, [])

    const loadListings = () => {
        getListingsApi.request();
    }
    return (
        <>
            <ActivityIndicator visible={getListingsApi.loading} />
            <Screen style={styles.screen}>
                {getListingsApi.error && <>
                    <AppText>Couldn't retrieve the listings.</AppText>
                    <AppText> Error: {getListingsApi.errorMessage} </AppText>
                    <Button title='Retry' onPress={loadListings} />
                </>}
                <FlatList
                    data={getListingsApi.data}
                    keyExtractor={listing => listing.id.toString()}
                    renderItem={({ item }) =>
                        <Card
                            title={item.title}
                            subTitle={"$" + item.price}
                            imageUrl={item.images[0].url}
                            thumbnailUrl={item.images[0].thumbnailUrl}
                            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                        />
                    }
                />
            </Screen>
        </>
    );
}
const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: colors.white
    }
})

export default ListingsScreen;