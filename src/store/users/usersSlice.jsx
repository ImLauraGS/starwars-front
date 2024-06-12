import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../services/usersService';

const initialState = null;

export const registerUser = createAsyncThunk(
    'users/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await userApi().register(userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await userApi().login(userData);
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'users/logout',
    async (_, { rejectWithValue }) => {
        try {
            await userApi().logout();
            return null; 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.fulfilled, (state, action) => {
            const { access_token, ...userData } = action.payload;
            localStorage.setItem('user', JSON.stringify({ ...userData, access_token }));
            return { ...userData, access_token };
        })
            .addCase(registerUser.rejected, (state, action) => {
                console.error('Error registering user:', action.payload);
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { access_token, ...userData } = action.payload;
                localStorage.setItem('user', JSON.stringify({ ...userData, access_token }));
                return { ...userData, access_token };
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.error('Error logging in:', action.payload);
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                localStorage.removeItem('user');
                return null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                console.error('Error logging out:', action.payload);
            });
    },
});

export default userSlice.reducer;
