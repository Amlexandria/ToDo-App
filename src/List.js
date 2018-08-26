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
    }


    handleChildAdded(data){
        /** El contenido del nodo está en  .val() **/
        const newTask = data.val();
        // console.log(data);
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
			check: e.target.checked,
        });
        
        // if(e.target.checked == true){
        //     console.log("true")
        //     document.getElementsByTagName("span").style.textDecorationStyle = "line-through";
        // }
    }

    // handleCheckedTaskText(e){
    //     if(e.target.checked == true){
    //             console.log("true")
    //             document.getElementsByTagName("span").style.textDecorationStyle = "line-through";
    //         }
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
            task: '',
            error: '',
        }
        this.handleTask = this.handleTask.bind(this);
        this.handleCreateTask = this.handleCreateTask.bind(this);
        
    }

    handleTask(e){
        this.setState({task: e.target.value})
    }

    handleCreateTask(e){
        console.log(this.state.task);
        this.props.addTask(this.state.task);
        this.setState({task: ""});
    }

    

    render(){
        return(
            <section className="row">
            <div className="addForm input-field offset-s1 col s10">
            <input placeholder="Task" id="first_name" type="text" className="validate" value={this.state.task} onChange={this.handleTask} onKeyUp={(e)=>{if(e.keyCode===13)this.handleCreateTask()}}/>
            <a className="waves-effect waves-light btn right" onClick={this.handleCreateTask}>Add</a>
            </div>
            </section>
        );
    }
}



function TaskList(props) {
    return (
        <div className="row">
            <ul className="offset-s1 col s10">
            {props.tasks.map(task =>(
                <Task key={task.id} text={task.text}  id={task.id} onCheck={props.onCheck}/>
            ))}
            </ul>
        </div>
    );
}


class Task extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            newText: '',


        }
    }

    render(){
        return (
            <li key={this.props.id} className="col s8">
             <label>
             <input type="checkbox" className="filled-in" checked={this.props.check} id={this.props.id} onChange={this.props.onCheck}/>
             <span>{this.props.text}</span>
             </label>
         </li>
        );
    }
}


export default List;