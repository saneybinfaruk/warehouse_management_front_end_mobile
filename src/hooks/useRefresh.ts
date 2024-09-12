import {useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';

const useRefresh = (callback: () => void) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      callback();
    }, 2000);
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      callback();
    }
  }, [isFocused]);

  return {refreshing, onRefresh};
};

export default useRefresh;
