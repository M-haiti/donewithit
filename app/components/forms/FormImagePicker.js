import {useFormikContext } from 'formik';
import React, { Fragment } from 'react';
import { ErrorMessage } from '.';
import ImageInputList from '../ImageInputList';

function FormImagePicker({name}) {
  const {setFieldValue, handleChange, errors, touched, values} = useFormikContext();
  const imageUris = values[name]

  const handleAdd = uri => {
    setFieldValue(name, [...imageUris,uri]);
  }


  const handleRemove = uri => {
    setFieldValue(name, imageUris.filter((imageUri) => imageUri !== uri))
  }

  return (
      <Fragment>
          <ImageInputList
            imageUris={imageUris}
            onAddImage={handleAdd}
            onRemoveImage={handleRemove}
          />
          <ErrorMessage error={errors[name]} visible={touched[name]}/>
      </Fragment>
  );
}

export default FormImagePicker;