export interface IPaginableResponse<T> {
  items: T;
  itemsFrom: Number;
  itemsTo: Number;
  totalItemsCount: Number;
  totalPages: Number;
}
