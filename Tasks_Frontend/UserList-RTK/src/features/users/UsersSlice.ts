import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../types/user";
import { addUserApi, deleteUserApi, getUsersApi, updateUserApi } from "./usersApi";

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
};

export const getUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    "users/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            return await getUsersApi();
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to fetch users list")
        }
    }
);

export const addUser = createAsyncThunk<User, User, { rejectValue: string }>(
    "users/addUser",
    async (userData, { rejectWithValue }) => {
        try {
            return await addUserApi(userData);
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to add new user");
        }
    }
);

export const updateUser = createAsyncThunk<User, { id: number, userData: Partial<User> }, { rejectValue: string }>(
    "users/updateUser",
    async ({ id, userData }, { rejectWithValue }) => {
        try {
            return await updateUserApi(id, userData);
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to update user details");
        }
    }
);

export const deleteUser = createAsyncThunk<number, number, { rejectValue: string }>(
    "users/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            await deleteUserApi(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to delete user");
        }
    }
);

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.users = state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                );
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null
            })

            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.users = state.users.filter(user =>
                    user.id !== action.payload
                )
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null
            })
    }
});

export default userSlice.reducer;
export const selectUserById = (state: { users: UserState }, id: string | number) =>
    state.users.users.find(user => String(user.id) === String(id));