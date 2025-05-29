// This file contains the API endpoints for the application.
export const BASE_URL = "http://localhost:8001/api/v1";

export const API_ENDPOINTS = {
    AUTH:{
        LOGIN: `${BASE_URL}/auth/login`,
        REGISTER: `${BASE_URL}/auth/register`,
        FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
        GET_USER_INFO: `${BASE_URL}/auth/profile`,
    },
    DASHBOARD:{
        GET_DASHBOARD_DATA: `${BASE_URL}/dashboard/get`,},
    INCOME:{
        GET_ALL_INCOME: `${BASE_URL}/income/get`,
        ADD_INCOME: `${BASE_URL}/income/add`,
        UPDATE_INCOME: `${BASE_URL}/income/update`,
        DELETE_INCOME:(incomeId)=>`${BASE_URL}/income/${incomeId}`,
    },
    EXPENSE:{
        GET_ALL_EXPENSE: `${BASE_URL}/expense/get`,
        ADD_EXPENSE: `${BASE_URL}/expense/add`,
        UPDATE_EXPENSE: `${BASE_URL}/expense/update`,
        DELETE_EXPENSE:(expenseId)=> `${BASE_URL}/expense/delete/${expenseId}`,
    },
}