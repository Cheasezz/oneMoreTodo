export class Utils {
  static isValid(value) {
    return value.trim() != '';
  }

  static signinErrorHandler(error) {
    const errorContainer = document.querySelector('.errorLogSignin');
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorContainer.textContent = 'Email already in use';
        break;
			case 'auth/weak-password':
			errorContainer.textContent = 'Password should be at least 6 characters'

      default:
        break;
    }
  }

  static loginErrorHandler(error) {
    const errorContainer = document.querySelector('.errorLogLogin');
    switch (error.code) {
      case 'auth/wrong-password':
        errorContainer.textContent = 'Wrong password';
        break;
      case 'auth/user-not-found':
        errorContainer.textContent = 'Wrong email, user not found';
        break;

      default:
        break;
    }
  }
}


