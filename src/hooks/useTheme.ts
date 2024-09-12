import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../redux/ThemeSlice';
import {RootState} from '../redux/Store';

const useTheme = () => {
  const {themeMode} = useSelector((state: RootState) => state.themeSlice);

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setTheme(themeMode === 'dark' ? 'light' : 'dark'));
  };

  return {handleToggle};
};
export default useTheme;
