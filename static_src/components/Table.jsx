import React from "react";
import ReactDOM from "react-dom";
import AddForm from "./AddForm";
import SelectedElement from "./SelectedElement";
import PropTypes from "prop-types";
import left from '../img/left.png';
import right from '../img/right.png';


export default class Table extends React.Component {


static propTypes = {
 table:PropTypes.array.isRequired,
};
state = {
	input:'', //Пользовательский ввод.Проброс в качестве пропс нужен для своевременного обновления и сброса
	currentStart:0, //Индекс стартового элемента массива для большой таблицы
	currentCount:51, //Индекс конечного элемента массива 
	filtered:[], //Массив отфильтрованных значений таблицы
	f:false, /*Filter.Для сокрашения написания и защиты от дублирования зарезервированного фрэймворком метода объекта\функции или метода массива*/
	visible:false, //Видимость формы добавления данных
	selected:{}, // Вбраный пользователь
	direction:'', //Направление сортировки
	sortedBy:'', //Тип данных сортировки(ID,FIRST NAME,LAST NAME  т.д.)
};
componentDidUpdate(prevProps) { //Сравниваем предыдущие props для запуска фильтрации
   if (this.props.table !== prevProps.table) {
    this.setState({filtered:this.props.table, fetching:this.props.isFetching,f:false,direction:'',sortedBy:''});
  this.filtering();//Запуск фильтрации
   };
  };



filterButton = (text) => {// Обработчик кнопки фильтрации
	const {f,fetching,filtered,input} = this.state;
	const {table} = this.props;
	const filteredElements = table.filter( (item) => {
		if(text !== '' && f === false && fetching === false){
		 return Object.values(item).find((item)=>{
		 	return (String(item) === text) 
		 	|| (String(item.city) === text)
		 	|| (String(item.state) === text)
		 	|| (String(item.streetAddress) === text)
		 	|| (String(item.zip) === text)   
		 });

		}else{
			return this.props.table; //Если значение поиска пустое,возвращаем таблицу.Иначе код выдаст ошибку,т.к. попытается отрисовать пустой массив
		};
	});
	const userInfoSlice = filteredElements.map((item,i)=>{ //Удаление данных из массива отфильтрованных значений 
		if (item.user === true) {
			filteredElements.splice(i,i+1);//Удаление элемента с совпавшим индексом
		}else{
			return;
		};
	})

	this.setState({filtered:filteredElements,f:true});

	if(text !== '' && f === true && filtered.length > 0){
		this.setState({filtered:table, f:true})

	}else if (f === false && this.props.input === ''  && this.props.table.length > 0 && filtered.length > 0) {
		alert("Вы ничего не ввели");
	 	this.setState({f:false});//Фильтрация не запущена.Сообщаем об этом в state

	}else if(f === false && text === '' || text !== '' && this.props.table.length === 0 && filteredElements.length === 0 ){
		alert('Таблица не загружена!')
		this.setState({f:false});

	}else if(f === true && this.props.table.length > 0 && filteredElements.length > 0){//
		this.setState({filtered:table, f:false});
	
	}else if(f === false && this.props.table.length > 0 && filteredElements.length > 0){
		this.setState({filtered:filteredElements, f:true});
	};
	this.props.update(input); //Обновление значения ввода
 };

filtering = (item, i) => {   //Функция фильтрации создающая строки таблицы
		const {table} = this.props;
		const {filtered} = this.state;
			const element = (item, i) => {//Табличный элемент
				  return (
			  			<tr key={ i }
			  				onClick={ (event) => {this.selectUser(event.target.parentNode)} }
			  			 >
							<td>{item.id}</td>
							<td>{item.firstName}</td>
							<td>{item.lastName}</td>
							<td>{item.email}</td>
							<td>{item.phone}</td>
							<td>{item.address.streetAddress}</td>	
							<td>{item.address.city}</td>
							<td>{item.address.state}</td>	 
							<td>{item.address.zip}</td>	  
							<td>{item.description}</td>
				    	 </tr>
			   	  );
			};

			const userElement = (item, i) => {//Пользовательский элемент с оставшимися незаполненными ячейками 
				return(
						<tr key={ i }
						    onClick={ (event) => {this.selectUser(event.target.parentNode)}  }
						 >
							<td>{item.id}</td>
							<td>{item.firstname}</td>
							<td>{item.lastname}</td>
							<td>{item.email}</td>
							<td>{item.phone}</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					);
			};

	if(filtered.length === 0 && table.length > 0 && this.state.f) {//Вывод сообщения об отсутствии результата
		setTimeout(()=>{
			if (filtered.length === 0 && this.props.isFetching !== true && table.length !== 0) {
				alert('Результат не найден');
			}else{
				const tableElements = table.map((item, i) =>{
					if (Object.keys(item).length === 7 ) {
						return (element(item, i));
					}else if (Object.keys(item).length === 6) {
						return (userElement(item, i));
					};
				});
	  				return (this.state.direction === 'up' ? tableElements.reverse()  : tableElements);
			};
		},100);
		
			}else if(this.state.filtered.length > 0 && this.state.filtered.length <= 32){//Вывод таблицы с сортировкой
				const tableElements = filtered.map( (item, i) => {
					if (Object.keys(item).length === 7 ) {
						return (element(item, i));
					}else if (Object.keys(item).length === 6) {
						return (userElement(item, i));
					};
				});
					return (this.state.direction === 'up' ? tableElements.reverse()  : tableElements);
			
			}else if(filtered.length > 50){//Генерация большой таблицы
				const tableElements = this.state.filtered.map( (item, i) => {
					if (Object.keys(item).length === 7 ) {
						return (element(item, i));
					}else if (Object.keys(item).length === 6) {
						return (userElement(item, i));
					};
				});
					if (this.state.direction === 'up') {
					const reversed = tableElements.reverse();//Реверс таблицы
					const sliced = reversed.slice(this.state.currentStart, this.state.currentCount);//Обрезка таблицы	
						return (sliced);
					}else{
						const sliced = tableElements.slice(this.state.currentStart, this.state.currentCount); 
					return (sliced)
					};
			return (sliced);//Финальный возврат обрезанной таблицы с нужным направлением сортировки



			}else if (this.state.filtered.length > 32 && this.props.isFetching === false) {
					const filtering = this.state.filtered.map((item, i) => {
						if (Object.keys(item).length === 7 ) {
							return (element(item,i));
						}else if (Object.keys(item).length === 6) {
							return (userElement(item, i));
						};
			});
		return (this.state.direction === 'up' ? filtering.reverse()  : filtering);//Изменение порядка сортировки таблицы
		};
	};

	navigate = (direction)=> {//Функция пагинации
		if(direction === 'left' && this.state.startCount !== 0 && this.state.currentCount !== 51){
			this.setState({currentCount:this.state.currentCount - 50, currentStart: this.state.currentStart - 50});
		}else if (direction === 'right' && this.state.startCount !== 950 && this.state.currentCount !== 1001) {
			this.setState({currentCount:this.state.currentCount + 50, currentStart: this.state.currentStart + 50});
		}
	};

	addDataVisible = () => {
			if (this.state.visible === false && 
			   (this.state.filtered.length === 0 || this.state.filtered.length > 0 ) &&
			   (this.input === '' || this.input != '') &&
			   (this.props.table.length === 0 || this.props.table.length > 0)){
			this.setState({ visible:true });
		}else if( this.state.visible === true ){
			this.setState({ visible:false });
		};
	};

	addData = (item, i) => {
	const {filtered} = this.state;
	const splice = filtered.splice(0, 0, item);
		this.forceUpdate();
			alert('Данные добавлены.Если данные были добавлены в упорядоченный список, результат будет отображён при следующей сортировке.');
		this.filtering(item, i);//Перезапуск процесса фильтрации после добавления данных
	};

	selectUser = (target) =>{//Выбор пользователя
	const nodesProperties = Array.from(target.cells);
	const cellValue = nodesProperties.map( (item, i) =>{
			return (item.innerText); 
	});
	this.setState({selected:cellValue});
	};

	sorting = (target) => { //Функция сортировки
	
	const {filtered,sortedBy,direction} = this.state;
	const cleanString = target.innerText.replace(/[^A-Za-zА-Яа-яЁё]/g, ""); //Очистка строки от символа направления сортировки
	const targetValue = cleanString;
    const sorted = filtered.sort((a, b) => {

  {/* Запуск проверки значения и направения сортировки*/}
    if (targetValue == 'Id') {
    		this.setState({sortedBy:'Id',direction:'down'})
    	if (sortedBy !== 'Id') {
    		this.setState({sortedBy:'Id',direction:'down'})
    	}else if (sortedBy === 'Id' && direction === 'down') {
    		this.setState({sortedBy:'Id',direction:'up'})
    	};
      return a.id < b.id ? 1 : -1; //Проверка значений для последующей сортировки
    
    }else if (targetValue == 'FirstName') {
    		this.setState({sortedBy:'First Name',direction:'down'})
    	if (sortedBy !== 'First Name') {
    		this.setState({sortedBy:'First Name',direction:'down'})
    	}else if (sortedBy === 'First Name' && direction === 'down') {
    		this.setState({sortedBy:'First Name',direction:'up'})
    	};
      return a.firstName < b.firstName ? 1 : -1;

    }else if (targetValue == 'LastName') {
    		this.setState({sortedBy:'Last Name',direction:'down'});
    	if (sortedBy !== 'Last Name') {
    		this.setState({sortedBy:'Last Name',direction:'down'})
    	}else if (sortedBy === 'Last Name' && direction === 'down') {
    		this.setState({sortedBy:'Last Name',direction:'up'})
    	};
      return a.lastName < b.lastName ? 1 : -1;

    }else if (targetValue == 'email') {
    		this.setState({sortedBy:'Email',direction:'down'});
    	if (sortedBy !== 'Email') {
    		this.setState({sortedBy:'Email',direction:'down'})
    	}else if (sortedBy === 'Email' && direction === 'down') {
    		this.setState({sortedBy:'Email',direction:'up'})
    	};
      return a.email < b.email ? 1 : -1;

    }else if (targetValue == 'phone') {
    	this.setState({sortedBy:'Phone',direction:'down'});
    	if (sortedBy !== 'Phone') {
    		this.setState({sortedBy:'Phone',direction:'down'})
    	}else if (sortedBy === 'Phone' && direction === 'down') {
    		this.setState({sortedBy:'Phone',direction:'up'})
    	};
      return a.email < b.email ? 1 : -1;

    }else if (targetValue == 'Streetaddress') {
    	this.setState({sortedBy:'Street Address',direction:'down'});
    	if (sortedBy !== 'Street Address') {
    		this.setState({sortedBy:'Street Address',direction:'down'})
    	}else if (sortedBy === 'Street Address' && direction === 'down') {
    		this.setState({sortedBy:'Street Address',direction:'up'})
    	};


    }else if (a.address  === undefined) { //Проверка для пропуска сортировки пользовательских данных без адреса
    		return false;
    	if(b.address === undefined){
    		return false;
    	}else{
      		return a.address.streetAddress < b.address.streetAddress ? 1 : -1;
    	};

	}else if (targetValue == 'city') {
    	if (a.address  === undefined) {
    		return false;
    	}else if(b.address === undefined){
    		return false;
    	}else{
    		this.setState({sortedBy:'City',direction:'down'});
    		if (sortedBy !== 'City') {
    			this.setState({sortedBy:'City',direction:'down'})
    		}else if (sortedBy === 'City' && direction === 'down') {
    			this.setState({sortedBy:'City',direction:'up'})
    		};
      	return a.address.city > b.address.city ? 1 : -1;
    	};

	}else if (targetValue == 'state') {
    	if (a.address  === undefined) {
    		return false;
    	}else if(b.address === undefined){
    		return false;
    	}else{
    	this.setState({sortedBy:'State',direction:'down'});
    		if (sortedBy !== 'State') {
    			this.setState({sortedBy:'State',direction:'down'})
    		}else if (sortedBy === 'State' && direction === 'down') {
    			this.setState({sortedBy:'State',direction:'up'})
    		};
      		return a.address.state < b.address.state ? 1 : -1;
    	};

	}else if (targetValue == 'zip') {
    	if (a.address  === undefined) {
    		return false;
    	}else if(b.address === undefined){
    		return false;
    	}else{
    	this.setState({sortedBy:'zip',direction:'down'});
    		if (sortedBy !== 'zip') {
    			this.setState({sortedBy:'zip',direction:'down'})
    		}else if (sortedBy === 'zip' && direction === 'down') {
    			this.setState({sortedBy:'zip',direction:'up'})
    		};
      		return a.address.zip < b.address.zip ? 1 : -1;
    	};

    }else if (targetValue == 'description') {
    		this.setState({sortedBy:'Id',direction:'down'})
    	if (sortedBy !== 'Description') {
    		this.setState({sortedBy:'Description',direction:'down'})
    	}else if (sortedBy === 'Description' && direction === 'down') {
    		this.setState({sortedBy:'Description',direction:'up'})
    	};
      return a.description < b.description ? 1 : -1;
    };
  });

     this.setState({filtered:sorted});
}



	render(){
		const {currentStart,currentCount,sortedBy,direction,f,visible,filtered} = this.state;
		const elements = this.filtering();
		return(	
			<div className="table"  style={ this.props.isFetching ? { display:'none' } : { display:'block' }}>
				<div className="filterfield">
					<input value={this.props.input} onChange={  this.props.inputEvent }/>
						
						<button className="findandadd"
								 onClick={ () => {this.filterButton(this.props.input) }}
								 style={f ? {animation:'button .7s ease'} : {animation:'unset'} }
						>
						{ f ? "◄ Назад" : "Найти" }	
						</button>
						
						<button className="findandadd" onClick={ () => { this.addDataVisible()}}
							style={ (visible || filtered.length === 0) ? {display:'none',animation:'unset'} : {display:'block',animation:'button .7s ease'}}>
							Добавить
							</button>


				</div>	

					<AddForm visible={visible}
							 f={f}
							 addDataClose={ this.addDataVisible }
							 addData={this.addData}
					/>
					<table style={filtered.length !== 0 ? {animation:'table .5s ease'}:{animation:'unset'} }>
						<tbody>
							<tr>
								<td 
								className='tablepatern'	
								onClick={ (event) => {this.sorting(event.target)}}>Id
								<p style={sortedBy === 'Id' ? {display:'block'}:{display:'none'}}>
									{direction === 'up' ? '▲' : '▼'  /*Alt + Num*/}
								</p>
								</td>

								<td 
								className='tablepatern'	
								onClick={ (event) => {this.sorting(event.target)}}>First Name
								<p style={sortedBy === 'First Name' ? {display:'block'}:{display:'none'}}>
									{direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td
								className='tablepatern'	
								 onClick={ (event) => {this.sorting(event.target)}}>Last Name
								<p style={sortedBy === 'Last Name' ? {display:'block'}:{display:'none'}}>
									{direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td
								className='tablepatern'	
								 onClick={ (event) => {this.sorting(event.target)}}>email
								<p style={sortedBy === 'Email' ? {display:'block'}:{display:'none'}}>
									{direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td
								className='tablepatern'	
								 onClick={ (event) => {this.sorting(event.target)}}>phone
								<p style={sortedBy === 'Phone' ? {display:'block'}:{display:'none'}}>
									{direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td
								className='tablepatern'	
								 onClick={ (event) => {this.sorting(event.target)}}>Street address
								<p style={sortedBy === 'Street Address' ? {display:'block'}:{display:'none'}}>
									{direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td
								className='tablepatern'	
								 onClick={ (event) => {this.sorting(event.target)}}>city
								<p style={sortedBy === 'City' ? {display:'block'}:{display:'none'}}>
									{direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td 
								className='tablepatern'	
								onClick={ (event) => {this.sorting(event.target)}}>state
								<p style={sortedBy === 'State' ? {display:'block'}:{display:'none'}}>
									{direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td 
								className='tablepatern'	
								onClick={ (event) => {this.sorting(event.target)}}>zip
								<p style={sortedBy === 'zip' ? {display:'block'}:{display:'none'}}>
									{direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td
								className='tablepatern'	
								 onClick={ (event) => {this.sorting(event.target)}}>description
								<p style={sortedBy === 'Description' ? {display:'block'}:{display:'none'}}>
									{direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

							</tr>
						 { elements }
						</tbody>
				</table>
						<button onClick={ ()=>{this.navigate('left')}}
							className="directionButton buttonLeft" 
							style={ this.state.filtered.length > 50 && currentStart !== 0  ? {display:'block'} :{display:'none'}}>
							<img src={left} alt="arrow left"/>
						</button>

						<button onClick={ ()=>{this.navigate('right')}}
							className="directionButton buttonRight" 
							style={ this.state.filtered.length > 50 && currentCount !== 1001 ? {display:'block'} :{display:'none'}}>
							<img src={right} alt="arrow right"/>
						 </button>
				<SelectedElement selected={this.state.selected} />
			</div>
		)
	}
}