import {
  StyleSheet,
  Text,
  View,
  TextInput as RNTextInput,
  TextInputProps,
  InputModeOptions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {MyColors} from '../constants/MyColors';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BoldText from './BoldText';
import {useTheme} from '@react-navigation/native';
import RegularText from './RegularText';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';

interface Props<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholderText: string;
  inputMode?: InputModeOptions;
  secureTextEntry?: boolean;
  editable?: boolean;
}
const TextInput = <T extends FieldValues>({
  placeholderText,
  name,
  control,
  label,
  secureTextEntry = false,
  inputMode = 'text',
  editable = true,
  ...textInputProps
}: Props<T>) => {
  const [passwordVisible, setPasswordVisibility] = useState(secureTextEntry);
  const {colors} = useTheme();
  const {user} = useSelector((state: RootState) => state.authSlice);
  return (
    <View style={styles.container}>
      <BoldText style={[styles.label]}>{label}</BoldText>
      <Controller
        name={name}
        control={control}
        render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
          <>
            <View style={[styles.inputContainer, error && styles.errorInput]}>
              <RNTextInput
                style={[
                  styles.input,
                  {color: colors.text},
                  !editable && styles.nonEditableText,
                ]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value ? String(value) : ''}
                secureTextEntry={passwordVisible}
                placeholderTextColor={MyColors.lightText}
                placeholder={placeholderText}
                inputMode={inputMode}
                editable={editable}
                {...textInputProps}
              />

              {secureTextEntry && (
                <TouchableOpacity
                  style={styles.eye}
                  onPress={() => setPasswordVisibility(prev => !prev)}>
                  <Ionicons
                    name="eye"
                    size={20}
                    color={passwordVisible ? 'gray' : MyColors.primaryColor}
                  />
                </TouchableOpacity>
              )}
            </View>
            {error && (
              <RegularText style={styles.errorText}>
                {error.message === 'Required'
                  ? `${label} is required!`
                  : error.message}
              </RegularText>
            )}
          </>
        )}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: MyColors.primaryColor,
    paddingTop: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
  },
  eye: {
    backgroundColor: 'lightgray',
    display: 'flex',
    padding: 5,
    borderRadius: 50,
    marginRight: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: MyColors.secondaryColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 13,
  },
  nonEditableText: {
    color: MyColors.lightText,
    borderColor: 'lightgray',
    borderWidth: 1,
    backgroundColor: 'lightgray',
  },
});
