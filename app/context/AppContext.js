import React, {useCallback, createContext} from 'react';
// import {Snackbar} from 'react-native-paper';

export const AppContext = createContext();

let displayMessage = '';

export const AppProvider = ({children}) => {
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = useCallback((message = '') => {
    displayMessage = message;
    setVisible(true);
  }, []);

  const onDismissSnackBar = useCallback(() => {
    setVisible(false);
    displayMessage = false;
  }, []);

  return (
    <AppContext.Provider
      value={{
        toggle: onToggleSnackBar,
      }}>
      {children}
      {/* <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={5000}>
        {displayMessage}
      </Snackbar> */}
    </AppContext.Provider>
  );
};
