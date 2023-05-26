export interface DatabaseUser {
  username: string;
  password: string;
  host?: string | 'localhost';
}
