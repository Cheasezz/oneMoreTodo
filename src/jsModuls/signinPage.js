// import {Utils} from './utils'

export class Signin {
	static createSigninPage(Auth, Utils) {
    const signinPage = `
		<div class="modalContainer">
			<div class="modalLogin">
				<form class="signinForm">
					<span class="moveToLogin">LogIn &rsaquo;</span>
					<input type="text" class="input" placeholder="Name" required/>
					<input type="email" class="input" placeholder="Email" required/>
					<input type="password" class="input" placeholder="Password" required />
					<b class="errorLogSignin"></b>
					<button type="submit" class="button">SignIn</button>
				</form>
				<form class="loginForm">
					<span class="moveToSignin">&lsaquo; SignIn</span>
					<input type="email" class="input" placeholder="Email" required/>
					<input type="password" class="input" placeholder="Password" required/>
					<b class="errorLogLogin"></b>
					<button type="submit" class="button">LogIn</button>
				</form>
			</div>
		</div>
		`;
    document.body.insertAdjacentHTML('afterbegin', signinPage);
    setListenersOnSigninPageItems(Auth, Utils);
  }
}

function setListenersOnSigninPageItems(Auth, Utils) {
  // Signin
  document.querySelector('.signinForm').addEventListener('submit', Auth.registerNewUser);
	document.querySelector('.signinForm input[type=password]').addEventListener('input', Utils.isValidPass)
  // Login
  document.querySelector('.loginForm').addEventListener('submit', Auth.loginUser);
  // Switch login/signin modal
  document.addEventListener('click', (event) => {
    switch (event.target.className) {
      case 'moveToLogin':
				document.querySelector('.errorLogSignin').textContent = ''
        document.querySelector('.signinForm').style.flex = '0 1 auto';
        document.querySelector('.loginForm').style.flex = 'none';
        break;
      case 'moveToSignin':
				document.querySelector('.errorLogLogin').textContent = ''
        document.querySelector('.signinForm').style.flex = 'none';
        document.querySelector('.loginForm').style.flex = '0 1 auto';
        break;
      default:
        break;
    }
  });
}