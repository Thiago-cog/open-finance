import axios from "axios";
const BASE_URL = "https://finance-pro-accounts-api.vercel.app/account";
// const BASE_URL = "http://localhost:3002/account";

class AccountsService {
    async createAccount(token, name, typeaccount, balance, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.post(`${BASE_URL}/create-accounts`, { name, typeaccount, balance, userId }, config);
            return response;
        }catch (error){
            return error.response;
        }
    }

    async getAccounts(token, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        
        try{
            const response = await axios.get(`${BASE_URL}/get-accounts/${userId}`, config);
            return response;
        }catch (error){
            return error.response;
        }
    }

    async createCard(token, accountsId, numberCard, dueDay, limitCard, value) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.post(`${BASE_URL}/create-card`, { accountsId, numberCard, dueDay, limitCard, value }, config);
            return response;
        }catch (error){
            return error.response;
        }
    }

    async getCards(token, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.get(`${BASE_URL}/get-card/${userId}`, config);
            return response;
        }catch (error){
            return error.response;
        }
    }
    
    async getAllStatus(token, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.get(`${BASE_URL}/get-all-status/${userId}`, config);
            return response;
        }catch (error){
            return error.response;
        }
    }

    async getCategories(token) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.get(`${BASE_URL}/get-categories`, config);
            return response;
        }catch (error){
            return error.response;
        }
    }

    async createMovement(token, movementData) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            let response = {};
            if(movementData.activeTab === 'extract'){
                response = await axios.post(`${BASE_URL}/create-movement-extract`, movementData, config);
            }else {
                response = await axios.post(`${BASE_URL}/create-movement-invoice`, movementData, config);
            }
            return response;
        }catch (error){
            return error.response;
        }
    }

    async getAllMoviments(token, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.get(`${BASE_URL}/get-all-moviments/${userId}`, config);
            return response;
        }catch (error){
            return error.response;
        }
    }

    async getTotalRevenueByUserId(token, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.get(`${BASE_URL}/get-total-revenue/${userId}`, config);
            return response;
        }catch (error){
            return error.response;
        }
    }

    async getTotalExpensesByUserId(token, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.get(`${BASE_URL}/get-total-expenses/${userId}`, config);
            return response;
        }catch (error){
            return error.response;
        }
    }

    async getAllRevenueExpenses(token, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.get(`${BASE_URL}/get-revenue-expenses?userId=${userId}`, config);
            return response.data;
        }catch (error){
            return error.response;
        }
    }

    async deleteTransaction(token, transactionId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.delete(`${BASE_URL}/delete-transaction?transactionId=${transactionId}`, config);
            return response.data;
        }catch (error){
            return error.response;
        }
    }

    async deleteAccount(token, accountId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.delete(`${BASE_URL}/delete-account?accountId=${accountId}`, config);
            return response.data;
        }catch (error){
            return error.response;
        }
    }
    
    async deleteCard(token, cardId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.delete(`${BASE_URL}/delete-card?cardId=${cardId}`, config);
            return response.data;
        }catch (error){
            return error.response;
        }
    }
}


export default new AccountsService();