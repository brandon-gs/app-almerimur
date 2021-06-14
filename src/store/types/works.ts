interface DriverWork {
  id: number;
  driver_work_id: number;
  driver_work_user_id: number;
  driver_work_client_id?: string | null;
  driver_work_project_id?: string | null;
  driver_work_date?: Date | null | string;
  driver_work_vehicle_id?: string | null;
  driver_work_concept?: string | null;
  driver_work_hours?: number | null;
  driver_work_travels?: number | null;
  driver_work_created_at: string;
  driver_work_comments?: string;
  driver_work_finished: boolean | string;
}

type DriverWorksState = DriverWork[];

interface MechanicWork {
  id: number;
  mechanic_work_id: number;
  mechanic_work_user_id: number;
  mechanic_work_client_id: string | null;
  mechanic_work_machine_id: string | null;
  mechanic_work_hours: string | null;
  mechanic_work_created_at: Date | null;
  mechanic_work_works: string | null;
  mechanic_work_date?: Date | null | string;
  mechanic_work_finished: boolean | string;
  rechanges: MechanicRechangeResponse[] | null;
}
interface MechanicRechangeResponse {
  mechanic_rechange_id: string;
  mechanic_rechange_number: string;
  mechanic_rechange_work_id: string;
  rechange_id: string;
}

type MechanicWorksState = MechanicWork[];

interface MechanicWorkRechange {
  name: string;
  quantity: number;
}

type MechanicWorkRechanges = MechanicWorkRechange[];

interface DriverWorkDate {
  driver_work_date: string;
}

interface MechanicWorkDate {
  mechanic_work_date: string;
}

interface WorksState {
  works: DriverWorksState | MechanicWorksState;
  dates: Record<string, DriverWorksState | MechanicWorksState>;
}
