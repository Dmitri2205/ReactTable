## Тестовое задание на позицию junior frontend разработчик.

<h2>Описание поведения и ожидаемые результаты.</h2>

**Загрузка данных:**
Производится с помощью функции baseButton кнопок basebutton.
В зависимости от переданного кнопкой значения, аргумент берётся из состояния компонента по ссылке на объект со ссылкой на строку с запросо.Реализовано с помощью метода fetch().
<h4>Ожидаемое поведение:</h4>
В стояние компонента должен вернуться массив с данными в формате json с дальнейшим преобразованием его в объект состояния содержащий данные для таблицы.
<h4>Ожидаемое поведение:соответствует действительному.</h4>
Функции handleChange и inputUpdate обрабатывают введённое значение в поле ввода и изменяют состояние для последующего поиска по введённому значению.
Ожидаемое поведение соответствует результату работы функции.


**Поиск:**
Производится с помощью функции filterButton(text) принимающей в качестве аргумента введённый пользователем текст в поле ввода.
Функция перебирает массив в зависимости от условия состояния приложения.Если поле ввода остаётся пустым либо значения таблицы не переданы в компонент Table.jsx,функция выдаст предупреждение об ошибке.



**Фильтрация:**
Производится с помощью функции filtering(item, i) которая принимает в качестве аргумента объект и индекс итерируемого элемента.В зависимости от условия, функция добавляет пользовательский либо стандартный элемент по одному из шаблонов если в условии выбора шаблона указана длинна ключей для конкретного объекта(стандартный/пользовательский).
Так же эта функция отвечает за разбиение масива с длинно более 50 строк на страницы(пагинация) и учитывает отображение массива с конца если была вызвана сортировка по стобцам.
Если добавлены пользовательские данные,при сортировке они будут выведены в самом начале массива в случае сортировки по строкам адресов(Street address,state,city или zip).
<h4>Ожидаемое поведение функции соответствует действительному.<h4>

**Навигация:**
Происходит с помощью функции navigate(direction) которая принимает в качестве аргумента значение направления в зависимости от нажатой кнопки.Функция изменяет значение состояния начальной и конечной точки для переборки массива таблицы с помощью метода splice(this.state.startCount, this.state.currentCount).
Изменение состояния начальной и конечной точки позволяет динамично менять содержимое отображаемой текущей страницы масива с колличеством элементов более 50.
<h4>Ожидаемое поведение соответствует действительному.</h4>

**Добавление пользовательских данных:**
Способ реализован с помощью функции addData(item, i) принимающей в качестве аргументов объект передающийся из компонента AddForm который подготовлен функцией compileData() внутри него.
Функция добавляет элеиент в массив с помощью метода splice(0,0,item) принимающий в качкстве аргументов колличество удаляемых элементов,индекс начала удаления и сам объект.
Если методу splice() переданы 2 первых значения в качестве 0,метод добавит элемент в массив без удаления.
<h4>Ожидаемое поведение соответствует реальному поведению.Функция добавит переданный элемент в начало массива с индексом 0.Последующее добавление перезапишет все индексы элементов массива в функции filtering(item, i) и присвоит значение 0 последнему добавленному элементу.
</h4>

**Отображение формы добавления данных:**
Функция addDataVisible меняет состояние компонента Table.jsx которое в последствии передаётся компоненту AddForm.jsx и меняет стиль его отображения на "block" или "none" в зависимости от текущего состояния компонента AddForm.jsx и передаваемых в него значений.
Ожидаемое поведение соответствует действительному.

**Выбор пользователя:**

Функция принимает в кчестве аргумента цель события и обращается к узлу (parentNode) и возврашает значение элемента на котором произошло событие.Из-за особенности элементов таблицы в React следует предавать параметр event как callback для функции onClick.В противном случае функция возвращает значение родительского элемента которым является <table>.
Ожидаемое поведение:возврат значения в качестве строки для последующего изменения состояния и передачи его в компонент SelectedUser.jsx на основе которых будет изменено состояние видимости компонента и вывод данных внутри него.
<h4>Ожидаемое поведение соответствует действительному.</h4>
  
  
**Сортировка:**

Функция так же принимает в качестве аргумента элемент на котором произошло событие для последующего сравнения свойств элементов массива таблицы и вывода отсортированного массива для функции filtering() и последующего рендера таблицы по заданному аргументу.
<h4>Ожидаемое поведение:</h4>функция перебирает и сортирует массив сравнивая значение события и выводит массив в сортированной форме после обработки функцией filtering().

<h3>AddForm.jsx:</h3>
Функции handleChange и handleValues являются обработчиками событий ввода.
handleChange(event) принимая в качестве аргумента значение полей для ввода данных изменяет состояние с задержкой в 100ms для корректного и своевременного обновления состояния.
handleValues() использует резервированную функцию this.forceUpdate() для изменения состояния в реальном времени без задержек.Для этого в ней так же используется setTimeout().
Обновляет значение состояние связанное с полем ввода в реальном времени.
<h4>Ожидаемое поведение сответствует действительному.</h4>



**Добавление данных:**


compileData() является создающей объект для добавление в массив функцией.
Формирование объета для добавления происходит на основе введённых пльзователем значений в текстовые поля внутри формы добавления данных.Функция использует таймаут для корректного добавления данных в массив таблицы.
<h4>Ожидаемое поведение:Создание объекта на основе пользовательских данных из полей ввода.Ожидаемое поведение сответствует действительному.</h4>




