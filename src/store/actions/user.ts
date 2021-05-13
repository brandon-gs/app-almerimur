import { axios } from "api/";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { ReduxThunkAction } from "../types";

// Define action types
export const SET_USER = "SET_USER";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const UPDATE_USER_IMAGE = "UPDATE_USER_IMAGE";
export const LOGOUT = "LOGOUT";

// Define actions thunk
const login = (credentials: LoginForm): ReduxThunkAction => {
  return async (dispatch) => {
    try {
      const formData = new URLSearchParams();
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);
      const { data } = await axios.post("/login_user.php", formData);
      dispatch({
        type: SET_USER,
        payload: { ...data },
      });
      return {
        data,
        error: false,
      };
    } catch (e) {
      return {
        error: true,
        message: "Credenciales inválidas",
      };
    }
  };
};

const uploadImage = (image: ImageInfo, token: string): ReduxThunkAction => {
  return async (dispatch) => {
    try {
      const { uri } = image;
      const name = uri.split("/").pop() as string;
      const type = "image/" + name.split(".").pop();
      const body = new FormData();
      const file = ({
        uri,
        name,
        type,
      } as unknown) as Blob;
      body.append("MAX_FILE_SIZE", "10000000000");
      body.append("image", file);
      const { data } = await axios.post("/update_user_image.php", body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      dispatch({ type: UPDATE_USER_IMAGE, payload: data.image });
      return {
        error: false,
        data,
        message: "Imagen actualizada correctamente",
      };
    } catch (error) {
      return {
        error: true,
        message: "Error al actualizar la imagen.",
      };
    }
  };
};

const updateProfile = (
  profile: ProfileValues,
  token: string
): ReduxThunkAction => {
  return async (dispatch) => {
    try {
      const formData = new URLSearchParams();
      formData.append("name", profile.name);
      formData.append("job", profile.job);
      const { data } = await axios.post("/update_user_profile.php", formData, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: UPDATE_USER_PROFILE,
        payload: data.profile,
      });
      return {
        message: "Perfil actualizado correctamente",
        error: false,
      };
    } catch (e) {
      return {
        error: true,
        message: "Credenciales inválidas",
      };
    }
  };
};

const changePassword = async (newPassword: string, token: string) => {
  try {
    const formData = new URLSearchParams();
    formData.append("newPassword", newPassword);
    const { data } = await axios.post("/change_user_password.php", formData, {
      headers: {
        Authorization: token,
      },
    });
    console.log(data);
    return {
      error: false,
      message: "Contraseña actualizada correctamente.",
    };
  } catch (e) {
    return {
      error: true,
      message: "Error al cambiar la contraseña, intente más tarde.",
    };
  }
};

const logout = (): ReduxThunkAction => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};

export default {
  login,
  logout,
  updateProfile,
  uploadImage,
  changePassword,
};
