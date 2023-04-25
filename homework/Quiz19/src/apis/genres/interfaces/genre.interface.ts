export interface IGenreServiceFindByNames {
  genre: string[];
}

export interface IGenreServiceBulkInsert {
  tempGenre: { name: string }[];
}
