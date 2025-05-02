export interface ListUserType {
  uuid: string;
  full_name: string;
  email: string;
  personal_number: string;
  role: {
    uuid: string;
    code: string;
    name: string;
  };
  referal_count: number;
}
