export interface IActorServiceFindByNames {
  actor: string[];
}
export interface IActorServiceBulkInsert {
  tempActor: { name: string }[];
}
