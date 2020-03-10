import React from "react";
import ReactDOM from "react-dom";
import AddForm from "./AddForm";
import SelectedElement from "./SelectedElement";
import PropTypes from "prop-types";


export default class Table extends React.Component {

static propTypes = {
 table:PropTypes.array.isRequired,
};
state = {
	input:'',
	currentStart:0,
	currentCount:51,
	filtered:[],
	f:false, /*Filter.Для сокрашения написания и защиты от дублирования зарезервированного фрэймворком метода объекта\функции или метода массива*/
	visible:false,
	selected:{},
	direction:'',
	sortedBy:'',
};
componentDidUpdate(prevProps) {
   if (this.props.table !== prevProps.table) {
    this.setState({filtered:this.props.table, fetching:this.props.isFetching,f:false,direction:'',sortedBy:''});
  this.filtering();
   };
  };



filterButton = (text) => {
	const filteredElements = this.props.table.filter( (item) => {
		
		if(text !== '' && this.state.f === false && this.state.fetching === false){
		 return Object.values(item).find((item)=>{

		 	return (String(item) === text)});
		}else{
			return this.props.table;
		};
	});


	this.setState({filtered:filteredElements,f:true});

	if(text !== '' && this.state.f === true && this.state.filtered.length > 0){
		this.setState({filtered:this.props.table, f:true})

	}else if (this.state.f === false && this.props.input === ''  && this.props.table.length > 0 && this.state.filtered.length > 0) {
	 alert("Вы ничего не ввели");
	 this.setState({f:false});

	}else if(this.state.f === false && text === '' || text !== '' && this.props.table.length === 0 && filteredElements.length === 0 ){
			alert('Таблица не загружена!')
			this.setState({f:false});

	}else if(this.state.f === true && this.props.table.length > 0 && filteredElements.length > 0){
		this.setState({filtered:this.props.table, f:false});
	
	}else if(this.state.f === false && this.props.table.length > 0 && filteredElements.length > 0){
		this.setState({filtered:filteredElements, f:true});
	};
	this.props.update(this.state.input);
 };

filtering = (item, i) => {

		const {table} = this.props;
		const {filtered} = this.state;
			const element = (item, i) => {
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

			const userElement = (item, i) => {
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


	if(this.state.filtered.length === 0 && this.props.table.length > 0) {
		setTimeout(()=>{
			if (this.state.filtered.length === 0 && this.props.input === '' && this.props.isFetching !== true && this.props.table.length != 0 ) {
				alert('Результат не найден');
			}else{
				const tableElements = table.map((item, i) =>{
					if (Object.keys(item).length === 7 ) {
					return (element(item, i));
					}else if (Object.keys(item).length === 5) {
					return (userElement(item, i));
					};
				});
	  				return (this.state.direction === 'up' ? tableElements.reverse()  : tableElements);
			};
		},100);
		
			}else if(this.state.filtered.length > 0 && this.state.filtered.length <= 32){
				const tableElements = filtered.map( (item, i) => {
					if (Object.keys(item).length === 7 ) {
					return (element(item, i));
					}else if (Object.keys(item).length === 5) {
					return (userElement(item, i));
					};
				});
					return (this.state.direction === 'up' ? tableElements.reverse()  : tableElements);
			
			}else if(filtered.length > 50){
				const tableElements = this.state.filtered.map( (item, i) => {
						if (Object.keys(item).length === 7 ) {
					return (element(item, i));
					}else if (Object.keys(item).length === 5) {
					return (userElement(item, i));
					};
				});
					if (this.state.direction === 'up') {
						const reversed = tableElements.reverse();
						const sliced = reversed.slice(this.state.currentStart, this.state.currentCount);	
					return (sliced);
					}else{
						const sliced = tableElements.slice(this.state.currentStart, this.state.currentCount); 
					return (sliced)
					};
					return (sliced);



			}else if (this.state.filtered.length > 32 && this.props.isFetching === false) {
					const filtering = this.state.filtered.map((item, i) => {
						if (Object.keys(item).length === 7 ) {
							return (element(item,i));
						}else if (Object.keys(item).length === 5) {
							return (userElement(item, i));
						};
			});
		return (this.state.direction === 'up' ? filtering.reverse()  : filtering);
		};
	};

	navigate = (direction)=> {
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
	this.filtering(item, i);
	};

selectUser = (target) =>{

const nodesProperties = Array.from(target.cells);
const cellValue = nodesProperties.map( (item, i) =>{
	return (item.innerText); 
});
this.setState({selected:cellValue});
};



sorting = (target) => {
	
	const cleanString = target.innerText.replace(/[^A-Za-zА-Яа-яЁё]/g, "");
	const targetValue = cleanString;
	const {filtered} = this.state;
     const sorted = filtered.sort((a, b) => {
    if (targetValue == 'Id') {
    	if (this.state.direction === 'down') {
    	this.setState({sortedBy:'Id',direction:'up'})
    	}else{
    	this.setState({sortedBy:'Id',direction:'down'})
    	};
      return a.id < b.id ? 1 : -1;
    };
    if (targetValue == 'FirstName') {
    	if (this.state.direction === 'down') {
    	this.setState({sortedBy:'First Name', direction:'up'});
    	}else{
    	this.setState({sortedBy:'First Name',direction:'down'});
    	};
      return a.firstName < b.firstName ? 1 : -1;
    };
    if (targetValue == 'LastName') {
    	if (this.state.direction === 'down') {
    	this.setState({sortedBy:'Last Name',direction:'up'});
    	}else{
    	this.setState({sortedBy:'Last Name',direction:'down'});
      	};
      return a.lastName < b.lastName ? 1 : -1;
    };
    if (targetValue == 'email') {
    	if (this.state.direction === 'down') {
    	this.setState({sortedBy:'Email',direction:'up'});
    	}else{
    	this.setState({sortedBy:'Email',direction:'down'});
    	};
      return a.email < b.email ? 1 : -1;
    };
    if (targetValue == 'phone') {
    	if (this.state.direction === 'down') {
    	this.setState({sortedBy:'Phone',direction:'up'});
    	}else{
    	this.setState({sortedBy:'Phone',direction:'down'});
    	};
      return a.email < b.email ? 1 : -1;
    };
    if (targetValue == 'Streetaddress') {
    	if (this.state.direction === 'down') {
    	this.setState({sortedBy:'Street Address',direction:'up'});
    	}else{
    	this.setState({sortedBy:'Street Address',direction:'down'});
    	};
    	if (a.address  === undefined) {
    		return false;
    	}else if(b.address === undefined){
    		return false;
    	}else{
      		return a.address.streetAddress < b.address.streetAddress ? 1 : -1;
    	};
};
    if (targetValue == 'city') {
    	if (this.state.direction === 'down') {
    	this.setState({sortedBy:'City',direction:'up'});
    	}else{
    	this.setState({sortedBy:'City',direction:'down'});
    	};
    	if (a.address  === undefined) {
    		return false;
    	}else if(b.address === undefined){
    		return false;
    	}else{
      		return a.address.city > b.address.city ? 1 : -1;
    	};
};
     if (targetValue == 'state') {
    	if (this.state.direction === 'down') {
    	this.setState({sortedBy:'State',direction:'up'});
    	}else{
    	this.setState({sortedBy:'State',direction:'down'});
    	};
    	if (a.address  === undefined) {
    		return false;
    	}else if(b.address === undefined){
    		return false;
    	}else{
      		return a.address.state < b.address.state ? 1 : -1;
    };
	};
     if (targetValue == 'zip') {
    	if (this.state.direction === 'down') {
    	this.setState({sortedBy:'zip',direction:'up'});
    	}else{
    	this.setState({sortedBy:'zip',direction:'down'});
    	};

    	if (a.address  === undefined) {
    		return false;
    	}else if(b.address === undefined){
    		return false;
    	}else{
      return a.address.zip < b.address.zip ? 1 : -1;
    	};
    };
    if (targetValue == 'description') {
    	if (this.state.direction === 'down') {
    	this.setState({sortedBy:'Description',direction:'up'});
    	}else{
    	this.setState({sortedBy:'Description',direction:'down'});
    	};
      return a.description < b.description ? 1 : -1 || 0;
    };
  });
     this.setState({filtered:sorted});
}



	render(){
		const elements = this.filtering();
		return(	
			<div className="table"  style={ this.props.isFetching ? { display:'none' } : { display:'block' }}>
				<div className="filterfield">
					<input value={this.props.input} onChange={  this.props.inputEvent }/>
						
						<button className="findandadd" onClick={ () => {this.filterButton(this.props.input) }} >
						{ this.state.f ? "◄ Назад" : "Найти" }
						</button>
						
						<button className="findandadd" onClick={ () => { this.addDataVisible()}}
							style={ ((this.state.visible) || (this.state.filtered.length === 0)) ? {display:'none'} : {display:'block'}}>
							Добавить
							</button>

					<AddForm visible={this.state.visible}
							 f={this.state.f}
					addDataClose={ this.addDataVisible }
					addData={this.addData}
					/>

				</div>	

					<table>
						<tbody>
							<tr>
								<td 
								className='tablepatern'	
								onClick={ (event) => {this.sorting(event.target)}}>Id
								<p style={this.state.sortedBy === 'Id' ? {display:'block'}:{display:'none'}}>
									{this.state.direction === 'up' ? '▲' : '▼'  /*Alt + Num*/}
								</p>
								</td>

								<td 
								className='tablepatern'	
								onClick={ (event) => {this.sorting(event.target)}}>First Name
								<p style={this.state.sortedBy === 'First Name' ? {display:'block'}:{display:'none'}}>
									{this.state.direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td
								className='tablepatern'	
								 onClick={ (event) => {this.sorting(event.target)}}>Last Name
								<p style={this.state.sortedBy === 'Last Name' ? {display:'block'}:{display:'none'}}>
									{this.state.direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td
								className='tablepatern'	
								 onClick={ (event) => {this.sorting(event.target)}}>email
								<p style={this.state.sortedBy === 'Email' ? {display:'block'}:{display:'none'}}>
									{this.state.direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td
								className='tablepatern'	
								 onClick={ (event) => {this.sorting(event.target)}}>phone
								<p style={this.state.sortedBy === 'Phone' ? {display:'block'}:{display:'none'}}>
									{this.state.direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td
								className='tablepatern'	
								 onClick={ (event) => {this.sorting(event.target)}}>Street address
								<p style={this.state.sortedBy === 'Street Address' ? {display:'block'}:{display:'none'}}>
									{this.state.direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td
								className='tablepatern'	
								 onClick={ (event) => {this.sorting(event.target)}}>city
								<p style={this.state.sortedBy === 'City' ? {display:'block'}:{display:'none'}}>
									{this.state.direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td 
								className='tablepatern'	
								onClick={ (event) => {this.sorting(event.target)}}>state
								<p style={this.state.sortedBy === 'State' ? {display:'block'}:{display:'none'}}>
									{this.state.direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td 
								className='tablepatern'	
								onClick={ (event) => {this.sorting(event.target)}}>zip
								<p style={this.state.sortedBy === 'zip' ? {display:'block'}:{display:'none'}}>
									{this.state.direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

								<td
								className='tablepatern'	
								 onClick={ (event) => {this.sorting(event.target)}}>description
								<p style={this.state.sortedBy === 'Description' ? {display:'block'}:{display:'none'}}>
									{this.state.direction === 'up' ? '▲' : '▼' }
								</p>
								</td>

							</tr>
						 { elements }
						</tbody>
				</table>
						<button onClick={ ()=>{this.navigate('left')}}
							className="directionButton buttonLeft" 
							style={ this.state.filtered.length > 50 ? {display:'block'} :{display:'none'}}>
							←
						</button>

						<button onClick={ ()=>{this.navigate('right')}}
							className="directionButton buttonRight" 
							style={ this.state.filtered.length > 50 ? {display:'block'} :{display:'none'}}>
						→
						 </button>
				<SelectedElement selected={this.state.selected} />
			</div>
		)
	}
}