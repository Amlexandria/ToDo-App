import React from 'react';
import Authenticate from './Authenticate';
import firebase from 'firebase';
import List from './List';


class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user: null,
        }

        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                this.setState({user: user});
            } else {
                this.setState({user: null});
            }
            
        });
    }


    render() {
        const component = this.state.user ? <List user={this.state.user}/> : <Authenticate />;
        
            return (
                <main>
                    {component}
                </main>
            );
        }    
    }


// function List(props){
//     return(
//         <section>
//             <button type="button" onClick={()=>firebase.auth().signOut()}>Log Out</button>
//             <h1>{props.user.email}</h1>
//         </section>
//     );
    
// }

export default App;