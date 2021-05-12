import React, { useState } from "react";
import { Button, StyledText, TextInput } from "components/";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { baseURL } from "api/";
import { theme } from "theme/";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "hooks/";
import * as ImagePicker from "expo-image-picker";
import { MessageTypes } from "store/reducers/message";
import Edit from "assets/Edit.svg";
import actions from "store/actions";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";

function ProfileContainer() {
  const thunkDispatch = useThunkDispatch();
  const { image: userImage, name, job, token } = useSelector(
    (state) => state.user
  );

  const [profile, setProfile] = useState<ProfileValues>({ name, job });
  const [image, setImage] = useState<ImageInfo>({
    uri: "",
    height: 0,
    width: 0,
  });

  const canUpdate = Boolean(
    image.uri || name !== profile.name || job !== profile.job
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const handleChangeValue = (key: string) => (value: string) => {
    setProfile({ ...profile, [key]: value });
  };

  const handleUpdateProfile = async () => {
    // Enable loader
    thunkDispatch(actions.enableLoader());
    // Verify if profile info has a change
    const changeInfoProfile = name !== profile.name || job !== profile.job;
    // Initialize default global state message
    let show = false;
    let lastMessage = "Perfil actualizado correctamente.";
    let lastError = false;
    // Update image
    if (Boolean(image.uri)) {
      let { message, error } = await thunkDispatch(
        actions.uploadImage(image, token)
      );
      lastMessage = message;
      lastError = error;
      show = true;
    }
    // Update info profile
    if (!lastError && changeInfoProfile) {
      const { message, error } = await thunkDispatch(
        actions.updateProfile(profile, token)
      );
      lastMessage = message;
      lastError = error;
      show = true;
    }
    // Update global state message
    thunkDispatch(
      actions.updateGlobalMessage({
        message: lastMessage,
        show,
        type: lastError ? MessageTypes.Danger : MessageTypes.Success,
      })
    );
    // Disable loader
    thunkDispatch(actions.disableLoader());
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <View>
          {Boolean(image.uri) ? (
            <Image source={{ uri: image.uri }} style={styles.image} />
          ) : (
            <Image source={{ uri: baseURL + userImage }} style={styles.image} />
          )}
          <View style={styles.iconEdit}>
            <Edit onPress={pickImage} />
          </View>
        </View>
        <TextInput
          label="Nombre"
          value={profile.name}
          onChangeText={handleChangeValue("name")}
          style={styles.input}
        />
        <TextInput
          label="Cargo"
          value={profile.job}
          onChangeText={handleChangeValue("job")}
          onSubmitEditing={handleUpdateProfile}
        />
        <View style={styles.passwordText}>
          <TouchableOpacity>
            <StyledText color={theme.colors.secondary}>
              Cambiar contraseña
            </StyledText>
          </TouchableOpacity>
        </View>
        <Button
          text="Guardar"
          disabled={!canUpdate}
          styleText={{
            color: theme.colors.light,
            size: 2.5,
            children: "Guardar",
          }}
          style={styles.button}
          onPress={handleUpdateProfile}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    paddingTop: 32,
    paddingHorizontal: 32,
  },
  iconEdit: {
    position: "absolute",
    right: 0,
  },
  input: {
    marginBottom: 8,
  },
  image: {
    width: 302,
    height: 302,
    borderRadius: 302 / 2,
    marginBottom: 32,
  },
  passwordText: {
    width: 302,
    marginBottom: 24,
  },
  button: {
    marginTop: 8,
    marginBottom: 24,
    backgroundColor: theme.colors.primary,
    width: 302,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

export default ProfileContainer;
