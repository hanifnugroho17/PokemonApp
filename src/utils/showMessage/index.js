import { showMessage } from 'react-native-flash-message';
import { colors } from '../colors';

export function showError(message) {
  showMessage({
    message,
    type: 'default',
    backgroundColor: colors.warning,
    color: colors.white,
  });
}

export function showSuccess(message) {
  showMessage({
    message,
    type: 'default',
    backgroundColor: colors.background.secondary,
    color: colors.white,
  });
}
