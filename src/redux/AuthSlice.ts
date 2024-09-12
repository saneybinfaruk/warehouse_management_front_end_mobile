import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import {User} from '../interfaces/interfaces';

type AuthState = {
  token: string | null;
  user: User | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;

      const user = jwtDecode(state.token) as User;
      state.user = user;
    },

    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const {setToken, logout} = AuthSlice.actions;
export default AuthSlice.reducer;
