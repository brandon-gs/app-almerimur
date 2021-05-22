interface DriverWork {
  driver_work_id: number;
  driver_work_user_id: number;
  driver_work_client_name?: string | null;
  driver_work_project_name?: string | null;
  driver_work_date?: Date | null;
  driver_work_vehicle_name?: string | null;
  driver_work_concept?: string | null;
  driver_work_hours?: number | null;
  driver_work_travels?: number | null;
  driver_work_created_at: string;
  driver_work_finished: boolean | string;
}

type DriverWorksState = DriverWork[];

interface MechanicWork {
  mechanic_work_id: number;
  mechanic_work_user_id: number;
  mechanic_work_client_name: string | null;
  mechanic_work_machine_name: string | null;
  mechanic_work_created_at: Date | null;
  mechanic_work_works: string | null;
  mechanic_work_finished: boolean;
}

type MechanicWorksState = MechanicWork[];

interface MechanicWorkRechange {
  name: string;
  quantity: number;
}

type MechanicWorkRechanges = MechanicWorkRechange[];

type WorksState = DriverWorksState | MechanicWorksState;
