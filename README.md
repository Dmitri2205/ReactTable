<h1>Обратите внимание!<h1>
  <h6>Приложение выложено в репозиторий в режиме сборки (development).Сборка производилась посредством webpack 4.node_modules включены в gitignore.</h6>
  <br>
<h2>Описание поведения и ожидаемые результаты.</h2>

<h3>Загрузка данных:</h3>
Производится с помощью функции baseButton кнопок basebutton.
В зависимости от переданного кнопкой значения, аргумент берётся из состояния компонента по ссылке на объект со ссылкой на строку с запросом.Реализовано с помощью метода fetch().
<h4>Ожидаемое поведение:</h4>
В стояние компонента должен вернуться массив с данными в формате json с дальнейшим преобразованием его в объект состояния содержащий данные для таблицы.
<h4>Ожидаемое поведение соответствует действительному.</h4>
<br>
<h3>Обработка события ввода:</h3>
Функции handleChange и inputUpdate обрабатывают введённое значение в поле ввода и изменяют состояние для последующего поиска по введённому значению.
<h4>Ожидаемое поведение соответствует результату работы функции.</h4>


<h3>Поиск:</h3>
<br>
Производится с помощью функции filterButton(text) принимающей в качестве аргумента введённый пользователем текст в поле ввода.
Функция перебирает массив в зависимости от условия состояния приложения.Если поле ввода остаётся пустым либо значения таблицы не переданы в компонент Table.jsx,функция выдаст предупреждение об ошибке.
<h4>Ожидаемое поведение соответствует действительному.</h4>



<h3>Фильтрация:</h3>
Производится с помощью функции filtering(item, i) которая принимает в качестве аргумента объект и индекс итерируемого элемента.В зависимости от условия, функция добавляет пользовательский либо стандартный элемент по одному из шаблонов если в условии выбора шаблона указана длинна ключей для конкретного объекта(стандартный/пользовательский).
Так же эта функция отвечает за разбиение масива с длинно более 50 строк на страницы(пагинация) и учитывает отображение массива с конца если была вызвана сортировка по стобцам.
Если добавлены пользовательские данные,при сортировке они будут выведены в самом начале массива в случае сортировки по строкам адресов(Street address,state,city или zip).
<h4>Ожидаемое поведение функции соответствует действительному.</h4>

<h3>Навигация:</h3>
Происходит с помощью функции navigate(direction) которая принимает в качестве аргумента значение направления в зависимости от нажатой кнопки.Функция изменяет значение состояния начальной и конечной точки для переборки массива таблицы с помощью метода splice(this.state.startCount, this.state.currentCount).
Изменение состояния начальной и конечной точки позволяет динамично менять содержимое отображаемой текущей страницы массива с колличеством элементов более 50.
<h4>Ожидаемое поведение соответствует действительному.</h4>
<br>

<h3>Добавление пользовательских данных:</h3>
Способ реализован с помощью функции addData(item, i) принимающей в качестве аргументов объект передающийся из компонента AddForm который подготовлен функцией compileData() внутри него.
Функция добавляет элеиент в массив с помощью метода splice(0,0,item) принимающий в качкстве аргументов колличество удаляемых элементов,индекс начала удаления и сам объект.
Если методу splice() переданы 2 первых значения в качестве 0,метод добавит элемент в массив без удаления.
<h5>Ожидаемое поведение соответствует реальному поведению.</h5>
<br>
Функция добавит переданный элемент в начало массива с индексом 0.Последующее добавление перезапишет все индексы элементов массива в функции filtering(item, i) и присвоит значение 0 последнему добавленному элементу.
<br>


<h3>Отображение формы добавления данных:</h3>
Функция addDataVisible меняет состояние компонента Table.jsx которое в последствии передаётся компоненту AddForm.jsx и меняет стиль его отображения на "block" или "none" в зависимости от текущего состояния компонента AddForm.jsx и передаваемых в него значений.
</h4>Ожидаемое поведение соответствует действительному.</h4>
<br>



<h3>Выбор пользователя:</h3>
<br>
Функция принимает в кчестве аргумента цель события и обращается к узлу (parentNode) и возврашает значение элемента на котором произошло событие.Из-за особенности элементов таблицы в React следует предавать параметр event как callback для функции onClick.В противном случае функция возвращает значение родительского элемента которым является table.
  <h4>Ожидаемое поведение:</h4>возврат значения в качестве строки для последующего изменения состояния и передачи его в компонент SelectedUser.jsx на основе которых будет изменено состояние видимости компонента и вывод данных внутри него.
<br>
<h5>Ожидаемое поведение соответствует действительному.</h5>
  
  
<h3>Сортировка:</h3>

Функция так же принимает в качестве аргумента элемент на котором произошло событие для последующего сравнения свойств элементов массива таблицы и вывода отсортированного массива для функции filtering() и последующего рендера таблицы по заданному аргументу.
<h4>Ожидаемое поведение:</h4>
<br>
функция перебирает и сортирует массив сравнивая значение события и выводит массив в сортированной форме после обработки функцией filtering().

<h3>AddForm.jsx:</h3>
<br>
Функции handleChange и handleValues являются обработчиками событий ввода.
handleChange(event) принимая в качестве аргумента значение полей для ввода данных изменяет состояние с задержкой в 100ms для корректного и своевременного обновления состояния.
handleValues() использует резервированную функцию this.forceUpdate() для изменения состояния в реальном времени без задержек.Для этого в ней так же используется setTimeout().Обновляет значение состояния связанное с полем ввода в реальном времени.
<br>
<h4>Ожидаемое поведение сответствует действительному.</h4>
<br>



<h3>Добавление данных:</h3>


compileData() является создающей объект для добавление в массив функцией.
Формирование объета для добавления происходит на основе введённых пльзователем значений в текстовые поля внутри формы добавления данных.Функция использует таймаут для корректного добавления данных в массив таблицы.
<br>
<h4>Ожидаемое поведение:Создание объекта на основе пользовательских данных из полей ввода.Ожидаемое поведение сответствует действительному.</h4>


**Все тесты проводились вручную учитывая все возможные варианты комбинаций взаимодействия с элементами приложения(стандартные действия пользователя).Автотестирование не использовалось.Аномальное поведение элементов на момент финальной сборки не выявлено.**



