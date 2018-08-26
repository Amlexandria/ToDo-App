import React from 'react';
import firebase from 'firebase';

class Authenticate extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }


    handleEmailChange(e){
        this.setState({email: e.target.value})
    }

    handlePasswordChange(e){
        this.setState({password: e.target.value})
    }

    handleCreateUser(){
        console.log("entro");
        
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error =>{
            this.setState({error: error.message})
            
        });
    }

    handleLogin(){
        console.log("entro");
        
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error =>{
            this.setState({error: error.message})
            
        });
    }

    render(){

        return (
            <section className="row">
            <form className="offset-s1 col s10">
                <div>{this.state.error}</div>
                <input type="text" placeholder="mail" value={this.state.email} onChange={this.handleEmailChange}/>
                <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                <a className="waves-effect waves-light btn right" onClick={this.handleCreateUser}>Sign Up</a>
                {/* <button type="button" onClick={this.handleCreateUser}>Sign Up</button> */}
                <a className="waves-effect waves-light btn right" onClick={this.handleLogin}>Log In</a>
                {/* <button type="button" onClick={this.handleLogin}>Log In</button> */}
            </form>
            </section>
        );
    }


}

export default Authenticate;