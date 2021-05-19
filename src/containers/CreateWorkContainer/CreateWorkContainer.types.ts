interface CreateWorkForm {
  client: string;
  project: string;
  date: Date | null;
  vehicle: string;
  concept: string;
  hours: string;
  travels: string;
  comments: string;
}

interface CreateWorkFormError {
  client: boolean;
  project: boolean;
  date: boolean;
  vehicle: boolean;
  concept: boolean;
  hours: boolean;
  travels: boolean;
  comments: boolean;
}
