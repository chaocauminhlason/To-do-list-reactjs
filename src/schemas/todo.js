import * as yup from "yup";
import { PRIORITIES } from "../constants/priorities";
export function getTodoSchema ({isNew = false}={}) {

    const deadlineRule = yup.string()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Deadline must be in the format YYYY-MM-DD");
    

    return yup.object().shape({
        name: yup.string()
        .required("Name is required")
        .min(3, "Name should have min length of 3 characters").max(50, "Name should have max length of 50 characters"),
        description: yup.string().max(200, "Description should have max length of 200 characters"),
        deadline: isNew
        ?  deadlineRule.test("is-future-date", "Deadline must be a future date", 
            (value) => {
            const today = new Date().toISOString().split("T")[0];
            return value ? value >= today : true;
        }) : deadlineRule,
        priority: yup.string()
            .oneOf(Object.keys(PRIORITIES), "Invalid priority value")
            .required("Priority is required")
    })
}