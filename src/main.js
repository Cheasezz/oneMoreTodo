import './style.scss';
import {
  child,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
  remove,
} from 'firebase/database';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { Todo } from './jsModuls/todoPage';
import {Signin} from './jsModuls/signinPage'
import { Utils } from './jsModuls/utils';

const firebaseConfig = {
  apiKey: 'AIzaSyD3iqAsfNA7SXunp4wmvVDub8o8dOe5Mdw',
  authDomain: 'one-more-todo.firebaseapp.com',
  databaseURL: 'https://one-more-todo-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'one-more-todo',
  storageBucket: 'one-more-todo.appspot.com',
  messagingSenderId: '693861262647',
  appId: '1:693861262647:web:59c174c5b8466bebbda6b2',
};

const app = initializeApp(firebaseConfig),
  auth = getAuth(app),
  database = getDatabase(app);

class Auth {
  static registerNewUser(e) {
    e.preventDefault();
    const name = document.querySelector('.signinForm input[type=text]').value;
    const email = document.querySelector('.signinForm input[type=email]').value;
    const password = document.querySelector('.signinForm input[type=password]').value;
    return createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => Database.createNewUserInDatabase(user, name))
      .then(() => document.querySelector('.modalContainer').remove())
      .catch((error) => {
        Utils.signinErrorHandler(error);
        console.log(error.code);
        console.log(error.message);
      });
  }

  static loginUser(e) {
    e.preventDefault();

    const email = document.querySelector('.loginForm input[type=email]').value;
    const password = document.querySelector('.loginForm input[type=password]').value;

    return signInWithEmailAndPassword(auth, email, password)
      .then(() => document.querySelector('.modalContainer').remove())
      .catch((error) => {
        Utils.loginErrorHandler(error);
        console.log(error.code);
        console.log(error.message);
      });
  }

  static afterSignout() {
    document.querySelector('.container').remove();
    signOut(auth);
  }
}

class Database {
  static createNewUserInDatabase(user, name) {
    set(ref(database, 'users/' + user.uid), {
      username: name,
      email: user.email,
    });
    return user;
  }

  static addTodoTaskAtDatabase(e) {
    e.preventDefault();
    const input = document.querySelector('input');

    if (Utils.isValid(input.value)) {
      const uniqId = push(child(ref(database), 'users/')).key;
      const todoTask = {
        text: input.value.trim(),
        completed: false,
        key: uniqId,
      };
      const updates = {};

      updates['users/' + auth.currentUser.uid + '/tasks/' + uniqId] = todoTask;

      Todo.renderTodoTask(Database, todoTask);
      input.value = '';
      input.focus();
      return update(ref(database), updates);
    }
  }

  static toggleCompleteValueinTodoItemAtDatabase(task) {
    const updates = {};
    updates['users/' + auth.currentUser.uid + '/tasks/' + task.key] = {
      text: task.text,
      completed: task.completed,
      key: task.key,
    };
    return update(ref(database), updates);
  }

  static removeTodoTaskFromDatabase(task) {
    remove(ref(database, 'users/' + auth.currentUser.uid + '/tasks/' + task.key));
  }
}

function renderCurentUsersName() {
  get(child(ref(database), 'users/' + auth.currentUser.uid)).then((snapshot) => {
    const user = snapshot.val();
    document.querySelector('.username').append(user.username);
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    Todo.createTodoPage(Auth, Database);
    onValue(
      ref(database, 'users/' + user.uid + '/tasks/'),
      (snapshot) => {
        renderCurentUsersName();
        Todo.renderTodoListAfterRefreshPage(snapshot, Database);
      },
      { onlyOnce: true }
    );
  } else {
    Signin.createSigninPage(Auth, Utils);
  }
});
// 