import React from 'react'

class Login extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            name: "",
        }
    }


    render(){
        return (
            <section className="vh-100 gradient-custom">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card-transparent">
                            <div className="card-body p-5">
                
                            <h2 className="mb-3">Your name:</h2>
                
                            <div className="form-group form-outline mb-4">
                                <input type="text" id="name" className="form-control form-control-lg custom-input" 
                                    onChange={(e) => this.props.onChangeName(e.target.value)}
                                    />
                            </div>

                            <div className="text-center">
                                <button className="btn btn-outline-light btn-xl px-5 custom-button" type="button" 
                                    onClick={this.props.onLogin}>Login</button>
                            </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    }

}

export default Login