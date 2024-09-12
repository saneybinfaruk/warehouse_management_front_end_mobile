import React, {useState} from 'react';
import {
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import useTheme from '../hooks/useTheme';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SemiBoldText from '../components/SemiBoldText';
import {MyColors} from '../constants/MyColors';
import BoldText from '../components/BoldText';
import {logout} from '../redux/AuthSlice';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const {themeMode} = useSelector((state: RootState) => state.themeSlice);
  const {user} = useSelector((state: RootState) => state.authSlice);
  const {handleToggle} = useTheme();
  const [isEnabled, setIsEnabled] = useState(themeMode === 'dark');

  const toggle = () => {
    handleToggle();
    setIsEnabled(prev => !prev);
  };

  return (
    <View style={[styles.container]}>
      <View style={{alignItems: 'center', gap: 5, paddingVertical: 20}}>
        <BoldText style={{fontSize: 25}}>{user?.fullname}</BoldText>
        <SemiBoldText style={{fontSize: 16}}>{user?.email}</SemiBoldText>
        <SemiBoldText style={{fontSize: 16}}>{user?.role}</SemiBoldText>
      </View>

      <TouchableOpacity
        style={styles.contentContainer}
        onPress={toggle}
        activeOpacity={0.7}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="dark-mode"
            size={35}
            color={isEnabled ? MyColors.primaryColor : 'black'}
          />
          <SemiBoldText style={[styles.darkModeText]}>Dark Mode</SemiBoldText>
        </View>
        <View
          style={[
            styles.switchContainer,
            {borderColor: isEnabled ? MyColors.primaryColor : 'black'},
          ]}>
          <Switch
            onValueChange={toggle}
            value={isEnabled}
            trackColor={{false: 'transparent', true: 'transparent'}}
            thumbColor={isEnabled ? MyColors.primaryColor : 'black'}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.contentContainer}
        activeOpacity={0.7}
        onPress={() => dispatch(logout())}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="logout"
            size={35}
            color={isEnabled ? MyColors.primaryColor : 'black'}
          />
          <SemiBoldText style={[styles.darkModeText]}>Logout</SemiBoldText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    gap: 15,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  darkModeText: {
    fontSize: 18,
    color: 'black',
  },
  iconContainer: {flexDirection: 'row', alignItems: 'center', gap: 10},
  switchContainer: {
    borderWidth: 1.5,
    borderRadius: 50,
  },
});
