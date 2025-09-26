export interface QueryHistory {
  _id?: string;
  userId: string;
  query: string;
  result: string;
  createdAt?: Date;
}
