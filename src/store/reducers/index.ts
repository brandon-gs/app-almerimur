// Reducers
import user from "./user";
import message from "./message";
import loader from "./loader";
import clients from "./client";
import projects from "./project";
import works from "./works";
import modal from "./modal";
import machines from "./machine";
import vehicles from "./vehicle";
import rechanges from "./rechanges";

const rootReducer = {
  user,
  message,
  loader,
  clients,
  projects,
  machines,
  works,
  modal,
  vehicles,
  rechanges,
};

export default rootReducer;
