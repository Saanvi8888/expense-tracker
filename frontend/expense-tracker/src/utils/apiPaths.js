export const BASE_URL =import.meta.env.VITE_API_URL || "http://localhost:8000";
export const API_PATHS = {
    AUTH:{
        LOGIN:"/api/v1/auth/login",
        REGISTER:"/api/v1/auth/register",
        GET_USER_INFO:"/api/v1/auth/getUser",
    },
    DASHBOARD:{
        GET_DATA:"/api/v1/dashboard",
    },
    INCOME:{
        ADD_INCOME:"/api/v1/income/add",
        GET_ALL_INCOME:"/api/v1/income/get",
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME:"/api/v1/income/downloadexcel",
    },
    EXPENSE:{
        ADD_EXPENSE:"/api/v1/expense/add",
        GET_ALL_EXPENSE:"/api/v1/expense/get",
        DELETE_EXPENSE:(expenseId) => `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE:"/api/v1/expense/downloadexcel",
        GET_INSIGHTS:"/api/v1/expense/insights",
        GET_CATEGORY_WISE: "/api/v1/expense/category-wise",
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/v1/auth/upload-image",
    },
    BUDGET: {
        SET: "/api/v1/budget",
        GET_ALL: (month) => `/api/v1/budget/${month}`,
        GET_SUMMARY: (month) => `/api/v1/budget/summary/${month}`,
        DELETE:(id)  => `/api/v1/budget/${id}`,
    },
    AI:{
        GET_INSIGHTS : "/api/v1/ai/insights",
    },
};