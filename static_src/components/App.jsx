import React from 'react';
import ReactDOM from 'react-dom';
import Table from "./Table";
import style from './style/style.css';
import axios from 'axios';

export default class App extends React.Component {
	constructor(props) {
	  super(props);
	  this.button = React.createRef();
	}

	state = {
		input:'',
		responseData:[],
		minData:'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
		maxData:'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
		isFetching:false, //Состояние запроса
	};
	handleChange = (event) => { //Обработчик ввода
		this.setState({input:event.target.value});
	};
	inputUpdate = (state) => {
		this.setState({input:state});
	}

baseButton = (value) => {
	this.button.current.animation = 'button .8s ease';
    	this.setState({isFetching:true});
	if(value == this.state.minData ){
		axios.get(value) // VALUE передаётся с каждой кнопки со своей ссылкой на строку запроса из state`
			.then((response)=>{
    			this.setState({responseData:response.data,isFetching:false});		
			})
			.catch((error)=>{
				alert(error);
			});
	}else{
			axios.get(value)
			.then((response)=>{
    			this.setState({responseData:response.data,isFetching:false});		
			})
			.catch((error)=>{
				alert(error);
			});
	};
{/* Выбрана сторонняя бибилиотека AXIOS т.к. она основана 
	на промисах,более удобна в использовании и парсинге json формата,
	а так же позволяет писать код запросов более лаконично и понятно.
	Ниже представлен пример таких же запросов основанных на методе FETCH
	до рефакторинга данного кода.
 */}

// if(value == this.state.minData ){
//     fetch(value)
//        .then( (response) => {
//    		response.json().then( (data) => {
//    			if(response.ok){
//    				this.setState({responseData:data,isFetching:false});
//    			}else{
//    				setTimeout(()=>{
//    		this.setState({responseData:data,isFetching:false});
//    		}, 200);
//    		};
//    })
//  })
// }else{
// 	fetch(value)
//        .then( (response) => {
//    			response.json().then( (data) => {
//    				if(response.ok){
//    			this.setState({responseData:data,isFetching:false})
//    				}else{
//    						setTimeout(()=>{
//    					this.setState({responseData:data, isFetching:false})
//    					}, 540);
//    				};
//    			})
//   	})
// };
}


  render(){
  	const {isFetching,minData,maxData,responseData,input} = this.state; //Объявление значений state для большего удобства и сокращения кода
     return(
		<div className="app">
			
			<div className='loader' style={isFetching ? {display:'block'} : {display:'none'}}>
				<h1 style={ {textAlign:'center', marginTop:'10px',marginBottom:0} }>Загрузка данных</h1>
				<img src={ 'https://avatars.mds.yandex.net/get-pdb/936467/ec8e0f4a-2f47-40ff-a361-f68a90664934/orig' } />
			</div>
			
			<h1 style={{marginLeft:'20px'} , isFetching === true ? {display:'none'}:{display:'block'}}>Выберите размер базы</h1>
			
			<button	style={isFetching === true ? {display:'none'}:{display:'inline-block'}}
					className="basebutton" onClick={ () => { this.baseButton(minData) } }
					ref={this.button}
			>
					32
			</button>

			<button style={isFetching === true ? {display:'none'}:{display:'inline-block'}}
					className="basebutton" onClick={ () => { this.baseButton(maxData)} }
					ref={this.button}
			>
					1000
			</button>

				<Table table={responseData }
						isFetching={isFetching}
						inputEvent={this.handleChange} 
						input={this.state.input}
						update={this.inputUpdate}
				/>
		</div>
	 );
  }
}

