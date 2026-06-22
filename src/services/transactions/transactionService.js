import axios from 'axios';
import {BASE_URL} from "../../utils/url";
import {getUserFromStorage} from "../../utils/getUserFromStorage";

const token = getUserFromStorage();

export const addTransactionAPI = async({
    type, category, amount, date, description
}) => {
    const response = await axios.post(
        `${BASE_URL}/transactions/create`,
        {type, category, amount, date, description},
        {headers: {Authorization: `Bearer ${token}`}}
    );
    return response.data;
};

export const listTransactionsAPI = async({
    category, type, startDate, endDate,
}) => {
    const response = await axios.get(
        `${BASE_URL}/transactions/lists`,
        {params: {category, type, startDate, endDate},
        headers: {Authorization: `Bearer ${token}`}}
    );
    return response.data;
};