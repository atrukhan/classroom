import React from 'react'
import { Icon } from 'react-icons-kit'  
import {androidHand} from 'react-icons-kit/ionicons/androidHand'



class ClassRoom extends React.Component{


    render(){
      
        return (
            <div className="classroom-wrapper">
                <div className='classroom'>
                    <h3>Class members</h3>
                    <ul className="list-group custom-list-group">
                        {this.props.chats.map((el) => (
                            <li className='list-group-item custom-list-group-item' key={el.id}>
                               
                                <p>{el.name}</p>
                                {el.handUp === true &&
                                    <Icon icon={androidHand}/>
                                }
                            </li>
                        ))}   
                    </ul>
                </div>
            </div>
        )
      
    }

}

export default ClassRoom