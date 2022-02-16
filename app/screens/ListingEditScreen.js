import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native'
import Screen from '../components/Screen'
import * as Yup from 'yup'
import { AppForm, AppFormField, SubmitButton, AppFormPicker } from "../components/forms"
import CategoryPickerItem from '../components/CategoryPickerItem';
import FormImagePicker from '../components/forms/FormImagePicker';
import listingsApi from '../api/listings'
import useLocation from '../hooks/useLocation';
import UploadScreen from './UploadScreen';


const validationSchema = Yup.object().shape({
    title: Yup.string().min(1).required().label("Title"),
    price: Yup.number().min(1).max(10000).required().label("Price"),
    description: Yup.string().label("Description"),
    category: Yup.object().nullable().label("Category"),
    images: Yup.array().min(1, 'Please select at least one image')
})

const categories = [
    { label: 'Furniture', value: 1, backgroundColor: 'red', icon: 'apps' },
    { label: 'Clothing', value: 2, backgroundColor: 'green', icon: 'email' },
    { label: 'Cameras', value: 3, backgroundColor: 'blue', icon: 'lock' },
]

function ListingEditScreen(props) {
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    const location = useLocation()

    const handleSubmit = async (listing, { resetForm }) => {
        setProgress(0)
        setUploadVisible(true)
        const result = await listingsApi.addListing({ ...listing, location }, (progress) => setProgress(progress));

        if (!result.ok) {
            setUploadVisible(false)
            return alert(result.problem);
        }

        resetForm();
    }

    return (
        <Screen style={styles.container}>
            <UploadScreen onDone={() => setUploadVisible(false)} progress={progress} visible={uploadVisible} />
            <AppForm
                initialValues={{
                    title: "",
                    price: "",
                    description: "",
                    category: null,
                    images: []
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <FormImagePicker name="images" />
                <AppFormField
                    name="title"
                    placeholder="Title"
                    maxLength={255}
                />
                <AppFormField
                    name="price"
                    placeholder="Price"
                    maxLength={8}
                    keyBoardTyoe="numeric"
                    width={120}
                />
                <AppFormPicker
                    items={categories}
                    name="category"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Category"
                    width="50%"
                />
                <AppFormField
                    multiline
                    numberOfLines={3}
                    maxLength={255}
                    name="description"
                    placeholder="Description"
                />
                <SubmitButton title="Post" />
            </AppForm>
        </Screen>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20
    }
})

export default ListingEditScreen;