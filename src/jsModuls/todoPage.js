import {Utils} from './utils'

export class Todo {
	static createTodoPage(Auth,Database) {
		
    const todoPage = `
		<div class="container">
			<div class='header'>
				<p>Hello <span class='username'></span> let's</p>
				<h2>ToDo</h2>
				<p>something</p>
			</div>
			<button class='signout'>Signout</button>
			<div class="todo">
				<form class="inputRow">
					<input class="input" type="text" placeholder="What's next" />
					<button class="button" type="submit" disabled="true">Add</button>
				</form>
				<div class="totalRow">
					<p>Total: <span class="total">0</span></p>
				</div>
				<ul class="list"></ul>
			</div>
		</div>
		`;

    document.body.insertAdjacentHTML('afterbegin', todoPage);
    setListenersOnTodoPageItems(Auth,Database);
  }

  static renderTodoListAfterRefreshPage(snapshot, Database) {
    if (snapshot.val() != null) {
      const todoTasksFromdb = snapshot.val();
      Object.keys(todoTasksFromdb)
        .map((key) => ({
          ...todoTasksFromdb[key],
        }))
        .forEach((task) => Todo.renderTodoTask(Database, task));
    }
  }

  static renderTodoTask(Database, task) {
    const todoTask = `
			<li class='item'>
				<button class='button complete'>&#10003;</button>
				<p class='text'>${task.text}</p>
				<button class='button del'>Delete</button>
			</li>
		`;
    document.querySelector('.list').insertAdjacentHTML('afterbegin', todoTask);
    // Render total counter
    document.querySelector('.totalRow span').textContent =
      document.querySelector('.list').children.length;
    //
    const item = document.querySelector('.item');
    const complBtn = item.querySelector('.complete');
    const text = item.querySelector('.text');
    const delBtn = item.querySelector('.del');
    if (task.completed) {
      complBtn.classList.toggle('completed');
      text.classList.toggle('completed');
      item.classList.toggle('completed');
    }
    console.log(task.key);
    console.log(task.text);
    console.log(document.querySelector('.list').children.length);
    setListenersOnTodoTaskItems(Database, item, complBtn, text, delBtn, task);
  }
}

function setListenersOnTodoPageItems(Auth,Database) {
  const todoInput = document.querySelector('input');
  document.querySelector('.signout').addEventListener('click', Auth.afterSignout);
  document.querySelector('.inputRow').addEventListener('submit', Database.addTodoTaskAtDatabase);
  todoInput.addEventListener('input', () => {
    document.querySelector('.todo button').disabled = !Utils.isValid(todoInput.value);
  });
}

function setListenersOnTodoTaskItems(Database, item, complBtn, text, delBtn, task) {
  complBtn.addEventListener('click', () => {
    task.completed = !task.completed;
    console.log(task.key);
    console.log(task.completed);
    Database.toggleCompleteValueinTodoItemAtDatabase(task);
    complBtn.classList.toggle('completed');
    text.classList.toggle('completed');
    item.classList.toggle('completed');
  });
  delBtn.addEventListener('click', () => {
    Database.removeTodoTaskFromDatabase(task);
    item.remove();
    // Render total counter
    document.querySelector('.totalRow span').textContent =
      document.querySelector('.list').children.length;
		// 
  });
}
