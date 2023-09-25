export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  image?: any;
  status?: string;
  lastname?: string;
  id_rol?: number[] | number;
  id_status?: string;
  roles?: any;
}
