interface Rechange {
  rechange_id: string;
  rechange_title: string;
  rechange_price: string;
}

interface RechangeStore {
  rechange_id: string;
  number: string;
  title: string;
  id: string;
}

interface RechangeApi {
  id: string;
  mechanic_rechange_work_id: string;
  number: string;
  rechange_id: string;
  title: string;
}

type RechangesList = RechangeStore[];
