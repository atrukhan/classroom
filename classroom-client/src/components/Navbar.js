import React from 'react'

class Navbar extends React.Component{

    render(){
        return (
            <nav className="navbar navbar-expand-lg">
                 <div className="container-fluid">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle custom-nav-button-actions" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Actions
                        </button>
                        <ul className="dropdown-menu custom-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" onClick={this.props.onRaiseHand}>{this.props.handUp?"Raise hand down":"Raise hand up"}</a></li>
                        </ul>
                    </div>

                    <div className="dropdown">
                        <button className="btn dropdown-toggle custom-nav-button-profile" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                            {this.props.username}
                        </button>
                        <ul className="dropdown-menu custom-menu" aria-labelledby="dropdownMenuButton2">
                            <li><a className="dropdown-item" onClick={this.props.onLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
               
            </nav>

            
        )
    }

}

export default Navbar