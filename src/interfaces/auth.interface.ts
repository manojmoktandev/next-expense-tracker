export interface ILogin{
    email:string,
    password:string
}

export interface IRegister{
    fullname:string,
    username:string,
    email:string,
    password:string,
    confirmPassword:string,
    phone:string
}

export interface IUser {
    id:string,
    email:string,
    fullname:string,
    username:string,
    role:string,
    profile?:string[],
    createdAt:string,
    updatedAt:string
}
