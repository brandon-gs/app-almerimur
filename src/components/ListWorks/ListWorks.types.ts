interface ListWorksProps {
  works: DriverWorksState | MechanicWorksState;
  getWorks: () => Promise<void>;
}
