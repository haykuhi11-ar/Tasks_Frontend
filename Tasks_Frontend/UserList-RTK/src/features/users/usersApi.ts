import axios from "axios";
import { User } from "../../types/user";

const BASE_URL = "http://localhost:3000/users";

export const getUsersApi = async(): Promise<User[]> => {
    const response = await axios.get<User[]>(BASE_URL);
    return response.data;
}

export const addUserApi = async(userData: User): Promise<User> => {
    const response = await axios.post<User>(BASE_URL, userData);
    return response.data;
}

export const updateUserApi = async(id: number, userData: Partial<User>): Promise<User> => {
    const response = await axios.patch<User>(`${BASE_URL}/edit/${id}`, userData);
    return response.data;
}

export const deleteUserApi = async(id: number): Promise <void> => {
    await axios.delete<User>(`${BASE_URL}/${id}`);
}