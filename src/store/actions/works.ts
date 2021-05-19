import { axios } from "api/";
import { ReduxThunkAction } from "store/types";

export const UPDATE_WORKS = "UPDATE_WORKS";
export const ADD_WORK = "ADD_WORK";

const getDriverWorks = (token: string): ReduxThunkAction => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/driver/get_works.php", {
        headers: {
          authorization: token,
        },
      });
      dispatch({
        type: UPDATE_WORKS,
        payload: data.works,
      });
      return {
        error: false,
      };
    } catch (e) {
      return {
        error: true,
        message: "Error al obtener los trabajos, intentelo más tarde.",
      };
    }
  };
};

const createDriverWork = (
  token: string,
  work: CreateWorkForm
): ReduxThunkAction => {
  return async (_) => {
    try {
      const body = new FormData();
      for (const key in work) {
        const currentKey = key as keyof CreateWorkForm;
        const currentValue = work[currentKey];
        if (currentValue) {
          if (currentKey === "date") {
            const formatDate = new Date(currentValue)
              .toISOString()
              .slice(0, 10);
            body.append(key, formatDate);
          } else {
            body.append(key, currentValue.toString());
          }
        }
      }
      await axios.post(`/driver/create_work.php`, body, {
        headers: {
          authorization: token,
        },
      });
      return { error: false, message: "Trabajo creado correctamente " };
    } catch (e) {
      return {
        error: true,
        message: "Error al crear un nuevo trabajo, intente más tarde.",
      };
    }
  };
};

export default {
  createDriverWork,
  getDriverWorks,
};
