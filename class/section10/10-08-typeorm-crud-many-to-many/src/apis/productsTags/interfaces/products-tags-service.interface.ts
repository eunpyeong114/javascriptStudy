export interface IProductsTagsServiceFindByNames {
  tagNames: string[];
}

export interface IProductTagsServiceBulkInsert {
  names: { name: string }[];
}
