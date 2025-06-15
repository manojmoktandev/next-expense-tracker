import *  as yup from "yup"

export const LoginSchema =  yup.object({
    email:yup.string().required('Email is required').email('Enter valid Email'),
    password:yup.string().required('Password is required')
})

export const RegisterSchema = yup.object({
    fullname:yup.string().required('Fullname is Required'),
    username:yup.string().required('username is required'),
    email:yup.string().required('Email is required').email('Enter valid Email'),
    password:yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    confirmPassword:yup.string().oneOf([yup.ref('password')],'Password must match').required('Confirm password is required'),
    phone:yup.string().required('Phone is required').min(10,'Phone must be at least 10 number')
    .matches(/^\+?[1-9]\d{9,14}$/, 'Enter a valid phone number').max(10,'Enter only 10 digit phone no')
})