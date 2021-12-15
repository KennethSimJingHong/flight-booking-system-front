import * as yup from "yup";

export const loginSchema = yup.object().shape({
    username: yup.string().required("Please fill in the blank"),
    password: yup.string().required("Please fill in the blank").min(4, "Password must be at least 4 characters long")
});