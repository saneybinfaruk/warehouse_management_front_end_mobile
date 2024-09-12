import {DefaultTheme} from '@react-navigation/native';

export const LightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    primary: '#005459',
    primaryDarkColor: '#008b00',
    primaryAccentColor: '#e6f5e4',
    background: '#F5F5F5',
    card: 'white',
    text: 'black',
    textLight: 'dimgray',
    border: 'lightgray',
    notification: '#004145',
  },
};

export const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    primary: '#191A29',
    primaryDarkColor: '#11111B',
    primaryAccentColor: '#191A29',
    background: '#222432',
    card: '#2E2F45',
    text: 'white',
    textLight: 'whitesmoke',
    border: '#3e405e',
    notification: '#005459',
  },
};
