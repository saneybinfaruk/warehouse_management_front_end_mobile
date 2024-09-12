import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

type ThemeMode = '' | 'dark' | 'light';
interface SelectedTheme {
  themeMode: ThemeMode;
}

const initialState: SelectedTheme = {
  themeMode: Appearance.getColorScheme() as ThemeMode,
};

const ThemeSlice = createSlice({
  name: 'ThemeSlice',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload;
    },
  },
});

export const {setTheme} = ThemeSlice.actions;
export default ThemeSlice.reducer;
