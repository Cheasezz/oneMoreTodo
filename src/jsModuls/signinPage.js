export class Signin {
	static createSigninPage(Auth) {
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
    setListenersOnSigninPageItems(Auth);
  }
}

function setListenersOnSigninPageItems(Auth) {
  // Signin
  document.querySelector('.signinForm').addEventListener('submit', Auth.registerNewUser);
  // Login
  document.querySelector('.loginForm').addEventListener('submit', Auth.loginUser);
  // Switch login/signin modal
  document.addEventListener('click', (event) => {
    switch (event.target.className) {
      case 'moveToLogin':
        document.querySelector('.signinForm').style.flex = '0 1 auto';
        document.querySelector('.loginForm').style.flex = 'none';
        break;
      case 'moveToSignin':
        document.querySelector('.signinForm').style.flex = 'none';
        document.querySelector('.loginForm').style.flex = '0 1 auto';
        break;
      default:
        break;
    }
  });
}