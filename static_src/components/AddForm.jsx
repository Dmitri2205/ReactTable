import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";


export default class AddForm extends React.Component {
	constructor(props) {
	  super(props);
	this.input = React.createRef();
	}

	state={
		data:{},//Пользовательский объект
		visible:false,//Видимость формы
		allValues:false,//Проверка всех полей на заполнение
		id:Number(1),
		firstname:'',
		lastname:'',
		email:'',
		phone:'',
	};

	componentDidUpdate(prevProps){
		if(prevProps.visible != this.props.visible){//Сравнение пропс для отображения видимости
			this.setState({visible:this.props.visible});
		}
	};

	handleChange = (event) => { //Обработчик ввода
			this.setState({[event.target.name]: event.target.value});//Добавление данных в state по соответствующему ключу
		setTimeout(()=>{
			this.handleValues();
		},100);
	};


	handleValues = () => { //Обработчик введённых значений
		const {id,firstname,lastname,email,phone} = this.state;
		setTimeout( () => {
		if(id.length != 0 && firstname.length != 0 && lastname.length != 0 && email.length != 0 && phone.length != 0 ){
				this.setState({allValues:true});
			}else{
				this.setState({allValues:false});
			}
		},100)
		this.compileData();//Запуск компиляции пользательского объекта
	};

	compileData = () => {
		const {id,firstname,lastname,email,phone} = this.state;
				const item = new Object(); //Создание пользовательского объекта для добавление в массив таблицы
					item.id = id;
					item.firstname = firstname;
					item.lastname = lastname;
					item.email = email;
					item.phone = phone;
					item.user = true;
				this.setState({ data:item });
		setTimeout( () => {
			if(this.state.data.length > 0){
				this.setState({id:' ',
							   firstname:' ',
							   lastname:' ',
							   email:' ',
							   phone:' ',
				});
			}else if( !(id && firstname && lastname && email && phone) ){
				console.log('Не все данные заполнены');/*Подсказка*/
			}else{
				console.log('OK');	
			}
		},50);//Защит от Runtime ERROR
	};




	render(){
	return(
	<div className='AddForm' style={this.state.visible ? {display:'block'}:{display:'none'}}>
		<h1 >Форма добавления данных</h1>
		<button className='close' onClick={ () => {this.props.addDataClose()}}></button>
		<table>
			<tbody>
				<tr>
				<td>id</td>
				<td>first name</td>
				<td>last name</td>
				<td>email</td>
				<td>phone</td>
				</tr>
			</tbody>
		</table>
				<div className="inputRow">
					<input name='id' value={this.state.id} onChange={(event)=>{ this.handleChange(event)}} ref={this.input}/>
					<input name='firstname' value={this.state.firstname} onChange={(event)=>{ this.handleChange(event)}}/>
					<input name='lastname' value={this.state.lastname} onChange={(event)=>{ this.handleChange(event)}} />
					<input name='email' value={this.state.email} onChange={(event)=>{ this.handleChange(event)}}/>
					<input name='phone' value={this.state.phone} onChange={(event)=>{ this.handleChange(event)}}/>

					<button className='adddatabutton' onClick={ ()=>{ this.props.addData(this.state.data, 0)} }
					style={this.state.allValues ? {display:'block'} : {display:'none'} }
					>Добавить данные</button>

				</div>
		</div>	
		);
	}
}