import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import Navbar from './components/Navbar'
import ClassRoom from './components/ClassRoom'
import {over} from 'stompjs'
import SockJS from 'sockjs-client'

var stompClient = null

class App extends React.Component{    

    constructor(props){
        super(props);

        this.state = {
            username:'',
            ready:false,
            handUp: false,
            id: -1,
            connected:false,
            students:[]
        };

        this.logout = this.logout.bind(this);
        this.handleName = this.handleName.bind(this);
        this.onPublicMessageReciever = this.onPublicMessageReciever.bind(this);
        this.onConnected = this.onConnected.bind(this);
        this.onError = this.onError.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.raiseHand = this.raiseHand.bind(this);
    }

    registerUser(){    
        let Sock = new SockJS('http://localhost:8080/ws')
        stompClient = over(Sock)
        stompClient.connect({}, this.onConnected, this.onError)
    }

    onConnected(){    
        this.setState((state) => {
            return {
                username:state.username,
                ready:state.ready,
                handUp: state.handUp,
                id: state.id,
                connected:true,
                students:state.students
            };
          });
        stompClient.subscribe('/classroom/public', this.onPublicMessageReciever)
        this.userJoin()
    }

    userJoin(){    
        let message = {
            
            status: 'JOIN',
            sender: {
                name: this.state.username
            },
            message: '',
        }
        stompClient.send('/app/message',{},JSON.stringify(message))
    }

    onError(err){    
        console.log(err)
    }

    onPublicMessageReciever(payload){       
        let payloadData = JSON.parse(payload.body)

        switch(payloadData.status){
            case "JOIN":
                let s = this.state.students
                s.push({id:payloadData.sender.id, name:payloadData.sender.name, handUp:false})
                if(payloadData.sender.name === this.state.username) {  
                    this.setState((state) => {
                        return {
                            username:state.username,
                            ready:true,
                            handUp: state.handUp,
                            id: payloadData.sender.id,
                            connected:state.connected,
                            students:state.students
                        };
                      });

                    if(payloadData.students){
                        s.push(...payloadData.students)
                    }
                }
                this.setState((state) => {
                    return {
                        username:state.username,
                        ready:state.ready,
                        handUp: state.handUp,
                        id: state.id,
                        connected:state.connected,
                        students:[...s]
                    };
                  });
                break
            case "LEAVE":
                this.setState((state) => {
                    return {
                        username:state.username,
                        ready:state.ready,
                        handUp:state.handUp,
                        id: state.id,
                        connected:state.connected,
                        students:state.students.filter(e => e.id !== payloadData.sender.id)
                    };
                  });
                break
            case "HAND":            
                if(payloadData.sender.id === this.state.id){
                   
                    this.setState((state) => {
                        return {
                            username:state.username,
                            ready:state.ready,
                            handUp:state.handUp?false:true,
                            id:state.id,
                            connected:state.connected,
                            students:state.students
                        };
                      }, () => { console.log(this.state)});
                }
                let s2 = this.state.students.map(e => { 
                            
                    if(e.id === payloadData.sender.id) {
                        e.handUp = !e.handUp 
                        
                    }
                
                    return e
                })
                this.setState((state) => {
                    return {
                        username:state.username,
                        ready:state.ready,
                        handUp:state.handUp,
                        id: state.id,
                        connected:state.connected,
                        students:s2
                    };
                }, () => { console.log(this.state)});
                break
            case "ERROR":
                if(this.state.students.length === 0){    
                    stompClient.disconnect();
                    alert(payloadData.message)
                }
                
                break    

        }
    }

    raiseHand(){    
        let message = {
            status: 'HAND',
            sender: {
                name: this.state.username,
                id: this.state.id
            },
        }
        stompClient.send('/app/message',{},JSON.stringify(message))
    }

    logout(){    

        this.setState({
            username:'',
            ready:false,
            handUp: false,
            id: -1,
            connected:false,
            students:[]
        })
        stompClient.disconnect();
    }

    handleName(name){    
        this.setState((state) => {
            return {
                username:name,
                ready:state.ready,
                handUp: state.handUp,
                id: state.id,
                connected:state.connected,
                students:state.students
            };
        });
        
    }
    render(){ 
    return (
       
        <div>
            {this.state.ready?
            <div>
                <Navbar onRaiseHand={this.raiseHand} onLogout={this.logout} handUp={this.state.handUp} username={this.state.username}/>
                <ClassRoom chats={this.state.students}/>
            </div>
            :
            <Login onChangeName={this.handleName} onLogin={this.registerUser}/>
            }
        </div>
    )
    }
}

export default App