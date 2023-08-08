import {RegisterOptions} from "react-hook-form"

export const SHOPIFY_GRAPHQL_ENDPOINT = "/api/2023-07/graphql.json";

type Field = "firstName" | "lastName" | "email" | "password" | "confirmPassword"

export const validationRules: Record<Field, RegisterOptions> = {
    firstName: {
        required: "First Name is required.",
        pattern: {
            value: /^[a-zA-Z ]*$/,
            message: "Please enter valid first name."
        }
    },
    lastName: {
        required: "Last Name is required.",
        pattern: {
            value: /^[a-zA-Z ]*$/,
            message: "Please enter valid last name."
        }
    },
    email: {
        required: "Email is required.",
        pattern: {
            value: /^[\w-.]+@([\w]+\.)+[\w]{2,4}$/,
            message: "Please enter valid email."
        }
    },   
    password: {
        required: "Password is required.",
        pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
            message: "Please enter valid password."
        }
    },   
    confirmPassword: {
        required: "Confirm Password is required.",
        pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
            message: "Please enter valid password."
        }
    }   
} as const

export const TAGS = {
    collections: "collections",
    products: "products"
} as const