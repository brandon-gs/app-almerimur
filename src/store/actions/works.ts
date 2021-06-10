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

const finishMechanicWork = (token: string, id: number): ReduxThunkAction => {
  return async (dispatch) => {
    try {
      const formData = new URLSearchParams();
      formData.append("id", id + "");
      await axios.post("/mechanic/finish_work.php", formData, {
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

const updateMechanicWork = (
  token: string,
  work: CreateMWorkForm,
  id: number,
  rechanges: RechangeWorkFrom[]
): ReduxThunkAction => {
  return async (dispatch) => {
    try {
      const body = new FormData();
      await Promise.all(
        Object.keys(work).map((key) => {
          const currentKey = key as keyof CreateMWorkForm;
          const currentValue = work[currentKey];
          if (currentValue) {
            if (currentKey === "date") {
              const formatDate = new Date(currentValue as string)
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
      await axios.post("/mechanic/edit_work.php", body, {
        headers: {
          authorization: token,
        },
      });

      const rechangesToCreate = [];
      const rechangesToUpdate = [];

      for (const rechange of rechanges) {
        if (rechange.id) {
          rechangesToUpdate.push(rechange);
        } else {
          rechangesToCreate.push(rechange);
        }
      }

      await Promise.all(
        rechangesToUpdate.map(async (rechange) => {
          const body = new FormData();
          body.append("id", rechange.id!);
          body.append("title", rechange.title);
          body.append("number", rechange.number);
          await axios.post(`/mechanic/edit_work_rechange.php`, body, {
            headers: {
              authorization: token,
            },
          });
        })
      );

      dispatch(createMechanicRechangesWork(token, rechangesToCreate, id));

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
        const filterDateWorks = data.dates.filter(
          (obj: DriverWorkDate) =>
            !check.has(obj["driver_work_date"]) &&
            check.add(obj["driver_work_date"])
        );
        let projectsByDate: Record<string, any> = {};
        filterDateWorks.forEach((date: DriverWorkDate) => {
          if (date.driver_work_date) {
            projectsByDate[date.driver_work_date] = [];
            works.forEach((work) => {
              if (date.driver_work_date === work.driver_work_date) {
                projectsByDate[date.driver_work_date].push({
                  ...work,
                });
              }
            });
          }
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

const getMechanicWorkDates = (
  token: string,
  works: MechanicWorksState
): ReduxThunkAction => {
  return async (dispatch) => {
    if (works) {
      try {
        const { data } = await axios.get("/mechanic/get_work_dates.php", {
          headers: {
            authorization: token,
          },
        });
        const check = new Set();
        const filterDateWorks = data.dates.filter(
          (obj: MechanicWorkDate) =>
            !check.has(obj["mechanic_work_date"]) &&
            check.add(obj["mechanic_work_date"])
        );
        let projectsByDate: Record<string, any> = {};
        filterDateWorks.forEach((date: MechanicWorkDate) => {
          if (date.mechanic_work_date) {
            projectsByDate[date.mechanic_work_date] = [];
            works.forEach((work) => {
              if (date.mechanic_work_date === work.mechanic_work_date) {
                projectsByDate[date.mechanic_work_date].push({
                  ...work,
                });
              }
            });
          }
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

const createMechanicWork = (
  token: string,
  work: CreateMWorkForm,
  rechanges: RechangeWorkFrom[]
): ReduxThunkAction => {
  return async (dispatch) => {
    try {
      const body = new FormData();
      await Promise.all(
        Object.keys(work).map((key) => {
          const currentKey = key as keyof CreateMWorkForm;
          const currentValue = work[currentKey];
          if (currentValue) {
            if (currentKey === "date") {
              const formatDate = new Date(currentValue as string)
                .toISOString()
                .slice(0, 10);
              body.append(key, formatDate);
            } else if (currentKey !== "rechanges") {
              body.append(key, currentValue.toString());
            }
          }
        })
      );
      const { data } = await axios.post(`/mechanic/create_work.php`, body, {
        headers: {
          authorization: token,
        },
      });

      const workId = data.work.id;
      dispatch(createMechanicRechangesWork(token, rechanges, workId));

      return { error: false, message: "Trabajo creado correctamente " };
    } catch (e) {
      return {
        error: true,
        message: "Error al crear un nuevo trabajo, intente más tarde.",
      };
    }
  };
};

const createMechanicRechangesWork = (
  token: string,
  rechanges: RechangeWorkFrom[],
  workId: number
): ReduxThunkAction => {
  return async (_) => {
    try {
      await Promise.all(
        rechanges
          .filter((rechange) => Boolean(rechange.title || rechange.number))
          .map(async (rechange) => {
            const body = new FormData();
            body.append("number", rechange.number);
            body.append("title", rechange.title);
            body.append("id_work", workId + "");
            await axios.post(`/mechanic/create_work_rechange.php`, body, {
              headers: {
                authorization: token,
              },
            });
          })
      );
      return { error: false, message: "Recambios creados correctamente " };
    } catch (e) {
      return {
        error: true,
        message: "Error al crear los recambios del trabajo, intente más tarde.",
      };
    }
  };
};

const getMechanicWork = async (token: string, id: number) => {
  try {
    const formData = new URLSearchParams();
    formData.append("id", id + "");
    const { data } = await axios.post("/mechanic/get_work.php", formData, {
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

const getMechanicWorks = (token: string): ReduxThunkAction => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/mechanic/get_works.php", {
        headers: {
          authorization: token,
        },
      });
      const responseWorks = data.works ? data.works : [];
      const works = await Promise.all(
        responseWorks.map(async (work: MechanicWork, index: number) => {
          const rechangesResponse = await getMechanicRechanges(
            token,
            work.mechanic_work_id
          );
          const rechanges = rechangesResponse.rechanges
            ? rechangesResponse.rechanges
            : null;
          return { ...work, id: index, rechanges };
        })
      );
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

const getMechanicRechanges = async (token: string, idWork: number) => {
  try {
    const body = new FormData();
    body.append("id_work", idWork + "");
    const { data } = await axios.post(
      "/mechanic/get_work_rechanges.php",
      body,
      {
        headers: {
          authorization: token,
        },
      }
    );
    const responseRechanges = data.rechanges ? data.rechanges : [];
    return {
      error: false,
      rechanges: responseRechanges,
    };
  } catch (e) {
    return {
      error: true,
      message: "Error al obtener los recmabios, intentelo más tarde.",
    };
  }
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
  createMechanicWork,
  getMechanicWorks,
  getMechanicWork,
  finishMechanicWork,
  updateMechanicWork,
  getMechanicRechanges,
  getMechanicWorkDates,
};
