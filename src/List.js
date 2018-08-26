import React from 'react';
import firebase from 'firebase';

class List extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tasks: [
                        // {id: "1", text: "Example Task 1", check:true},
                        // {id: "2", text: "Example Task 2", check:true},
                        // {id: "3", text: "Example Task 3", check:false}
                    ]
        }
        
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleChildAdded = this.handleChildAdded.bind(this);
        this.tasksRef = firebase.database().ref().child(`tasks/${this.props.user.uid}`);
        this.handleCheckTask = this.handleCheckTask.bind(this);

        
    }



    componentDidMount(){
        this.tasksRef.on('child_added',this.handleChildAdded);
        // this.taskRef.on('child_remove', this.handleChildRemove);
    }

    //AGREGANDO UNA NUEVA TAREA AL ARRAY CON LA RESPUESTA DE FIREBASE
    handleChildAdded(data){
        /** El contenido del nodo está en  .val() **/
        const newTask = data.val();
        console.log(data);
		/** Necesitamos que el id pueda editarse o borrarse, así que lo guardamos en el objeto **/
        newTask.id= data.key
        // console.log(newTask);
        
		/** usamos concat para agregar la nueva task a la copia de array que genera concat **/
		let newTasks = this.state.tasks.concat(newTask);
		this.setState({ tasks: newTasks })
	}

    handleAddTask(task){
             console.log(task);
             /** si la task está vacía, no hacer nada **/
		if (!task.length) {
			return;
		}
		/** We generate the new reference and then insert the new key **/
        const key = this.tasksRef.push().key;
        this.tasksRef.child(key).set({
            task: task,
            check: false,
        });
    }

    handleCheckTask(e){
        // console.log(e.target);
        const taskRef = this.tasksRef.child(e.target.id);
		taskRef.update({
			check: e.target.checked
        });
    }

    

    // handleChildChanged(data){
	// 	/** We fill the new data with the needed data **/
	// 	const newTask = data.val();
	// 	newTask.id= data.key
		
	// 	/** We create a copy of the array to be patched **/
	// 	var newTasks = this.state.tasks.concat([]);
	// 	const index = newTasks.findIndex(task=> task.id=== data.key);
		
	// 	/** We insert the new task in place **/
	// 	newTasks.splice(index,1,newTask);
		
	// 	/** We finally rewrite the array**/
	// 	this.setState({ tasks: newTasks })
	// }

    render(){
        
        return(
                    <section className="row">
                        <section className="offset-s1 col s10">
                            <a className="waves-effect waves-light btn right" onClick={()=>firebase.auth().signOut()}>Log Out</a>
                            <h6>{this.props.user.email}</h6>
                        </section>
                        <section className ="list">
                            <AddForm addTask={this.handleAddTask}/>
                            <TaskList tasks={this.state.tasks} onCheck={this.handleCheckTask}/>
                        </section>
                    </section>
                );
            }
}


class AddForm extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            value: '',
            error: '',
        }
        this.handleTask = this.handleTask.bind(this);
        this.handleCreateTask = this.handleCreateTask.bind(this);
        
    }

    handleTask(e){
        this.setState({value: e.target.value})
    }

    handleCreateTask(){
        console.log(this.state.task);
        this.props.addTask(this.state.value);
        this.setState({value: ""});
    }

    

    render(){
        return(
            <section className="row">
                <div className="addForm input-field offset-s1 col s10">
                    <input placeholder="New Task" id="first_name" type="text" className="validate" value={this.state.value} onChange={this.handleTask} onKeyUp={(e)=>{if(e.keyCode===13)this.handleCreateTask()}}/>
                    <a className="waves-effect waves-light btn right" onClick={this.handleCreateTask}>Add</a>
                </div>
            </section>
        );
    }
}



function TaskList(props) {
    console.log(props)
    return (
        <div className="row">
            <ul className="offset-s1 col s10">
            {props.tasks.map(task =>(
                console.log(task),
                <Task key={task.id} text={task.task}  id={task.id} onCheck={props.onCheck}/>
            ))}
            </ul>
        </div>
    );
}


class Task extends React.Component{
    constructor(props){
        super(props);
        console.log(props);

        this.state = {
            text:'',
        }
    }

    render(){
        return (

            <li key={this.props.id} className="offset-s1 col s10">
                <div className="card">
                    <div className="card-content white-text">
                        <label>
                            <input type="checkbox" className="filled-in" checked={this.props.check} id={this.props.id} onChange={this.props.onCheck}/>
                            <span>{this.props.text}</span>
                        </label>
                    </div>
                <div className="card-action">
                    <a href="#"><i className="material-icons edit">edit</i></a>
                    <a href="#"><i className="material-icons delete">delete</i></a>
                </div>
                </div>
            </li>
        );
    }
}


export default List;