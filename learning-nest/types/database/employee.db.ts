export enum EmployeeRoleEnum {
  ADMIN = 'admin',
  ENGINEER = 'engineer',
  INTERN = 'intern',
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  role: EmployeeRoleEnum;
}

const data: Employee = {
  id: 1,
  name: 'John Doe',
  email: 'john@doe.com',
  role: EmployeeRoleEnum.ADMIN,
};
