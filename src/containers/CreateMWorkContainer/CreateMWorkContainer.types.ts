interface RechangeWorkFrom {
  id?: string;
  title: string;
  number: string;
}

interface RechangeWorkFormError {
  id?: string;
  index: number;
  title: boolean;
  number: boolean;
}

interface CreateMWorkForm {
  client: string;
  machine: string;
  date: Date | null;
  hours: string;
  works: string;
  rechanges: RechangeWorkFrom[];
}

interface CreateMWorkFormError {
  client: boolean;
  machine: boolean;
  date: boolean;
  hours: boolean;
  works: boolean;
  rechanges: boolean;
}
