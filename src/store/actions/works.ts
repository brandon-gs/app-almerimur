import { axios } from "api/";
import { ReduxThunkAction } from "store/types";

export const UPDATE_WORKS = "UPDATE_WORKS";
export const CLEAR_WORKS = "CLEAR_WORKS";
export const FINISH_DRIVER_WORK = "FINISH_WORK";
export const SET_DRIVER_WORK_DATES = "SET_DRIVER_WORK_DATES";

const getDriverWork = async (token: string, id: number) => {
  try {
    const formData = new URLSearchParams();
    formData.append("id", id + "");
    const { data } = await axios.post("/driver/get_work.php", formData, {
      headers: {
        authorization: token,
      },
    });
    return {
      error: false,
      work: data.work[0],
    };
  } catch (e) {
    return {
      error: true,
      message: "Error al obtener los trabajos, intentelo más tarde.",
    };
  }
};

const getDriverWorks = (token: string): ReduxThunkAction => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/driver/get_works.php", {
        headers: {
          authorization: token,
        },
      });
      const responseWorks = data.works ? data.works : [];
      const works = responseWorks.map((work: DriverWork, index: number) => {
        return { ...work, id: index };
      });
      dispatch({
        type: UPDATE_WORKS,
        payload: works ? works : [],
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
      await Promise.all(
        Object.keys(work).map((key) => {
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
        })
      );
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

const finishDriverWork = (token: string, id: number): ReduxThunkAction => {
  return async (dispatch) => {
    try {
      const formData = new URLSearchParams();
      formData.append("id", id + "");
      await axios.post("/driver/finish_work.php", formData, {
        headers: {
          authorization: token,
        },
      });
      dispatch({
        type: FINISH_DRIVER_WORK,
        payload: id,
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

const updateDriverWork = async (
  token: string,
  work: CreateWorkForm,
  id: number
) => {
  try {
    const body = new FormData();
    await Promise.all(
      Object.keys(work).map((key) => {
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
      })
    );
    body.append("id", id + "");
    await axios.post("/driver/edit_work.php", body, {
      headers: {
        authorization: token,
      },
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

const getDriverWorkDates = (
  token: string,
  works: DriverWorksState
): ReduxThunkAction => {
  return async (dispatch) => {
    if (works) {
      try {
        const { data } = await axios.get("/driver/get_work_dates.php", {
          headers: {
            authorization: token,
          },
        });
        const check = new Set();
        const filterDateWorks = data.works.filter(
          (obj: DriverWorkDate) =>
            !check.has(obj["driver_work_date"]) &&
            check.add(obj["driver_work_date"])
        );
        let projectsByDate: Record<string, any> = {};
        filterDateWorks.forEach((date: DriverWorkDate) => {
          projectsByDate[date.driver_work_date] = [];
          works.forEach((work) => {
            if (date.driver_work_date === work.driver_work_date) {
              projectsByDate[date.driver_work_date].push({
                ...work,
              });
            }
          });
        });
        dispatch({
          type: SET_DRIVER_WORK_DATES,
          payload: projectsByDate,
        });
        return {
          error: false,
        };
      } catch (e) {
        return {
          error: true,
          message:
            "Error al obtener las fechas de los trabajos, intentelo más tarde.",
        };
      }
    }
  };
};

const clearWorks = () => ({
  type: CLEAR_WORKS,
});

export default {
  createDriverWork,
  getDriverWorks,
  getDriverWork,
  finishDriverWork,
  updateDriverWork,
  getDriverWorkDates,
  clearWorks,
};
