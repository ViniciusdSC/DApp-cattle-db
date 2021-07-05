export interface Cattle {
  address: string;
  name: string;
  description: string;
  token: string;
  votes: number;
  addVote(): Promise<void>;
}
