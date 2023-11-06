interface LoginUserInput {
  email: string;
  password: string;
}
interface RegisterUserInput extends LoginUserInput {
  fullname: string;
  username: string;
  confirm_password: string;
}
interface UpdateUserInput {
  fullname: string;
  username: string;
  email: string;
}
interface ChangePasswordInput {
  prev_password: string;
  new_password: string;
  confirm_password: string;
}
interface IUser {
  email: string;
  fullname: string;
  username: string;
  id: string;
}
interface IContact {
  name: string;
  email: string;
  phone_number: string;
}
interface IContactDetailed extends IContact {
  _id: string;
}
