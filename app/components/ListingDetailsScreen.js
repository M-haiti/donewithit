import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import colors from '../config/colors';
import AppText from './AppText';
import ListItem from './ListItem';
import { Image } from 'react-native-expo-image-cache'
import ContactSellerForm from './ContactSellerForm';

function ListingDetailsScreen({ route }) {
    const listing = route.params
    const preview = { uri: listing.images[0] };
    const uri = listing.images[0]

    return (
        <KeyboardAvoidingView>

            <View>
                <Image style={styles.image}  {...{ preview, uri }} />
                <View style={styles.detailsContainer}>
                    <AppText style={styles.title}>{listing.title}</AppText>
                    <AppText style={styles.price}>${listing.price}</AppText>
                    <View style={styles.userContainer}>
                        <ListItem
                            image={require("../assets/mosh.jpg")}
                            title="MitiMaiti"
                            subTitle="5 Listings"
                        />
                    </View>
                </View>
                <ContactSellerForm listing={listing} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        padding: 20,
    },
    image: {
        width: "100%",
        height: 300
    },
    title: {
        fontSize: 24,
        fontWeight: "500"
    },
    price: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 10
    },
    userContainer: {
        marginVertical: 40
    }
})

export default ListingDetailsScreen;