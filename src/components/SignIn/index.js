import React, { Component } from 'react';
import './styles.scss';
import Button from "./../forms/Button";
import FormInput from "./../forms/FormInput"
import { signInWithGoogle,auth } from './../../firebase/utils';
import AuthWrapper from './../AuthWrapper';
import { Link } from 'react-router-dom';

const initialState = {
    email: '',
    password: '',

}

class SignIn extends Component {

    constructor(props){
        super(props);
        this.state = {
            ...initialState
        };
        //calls handle change so the text box can be updated
        this.handleChange = this.handleChange.bind(this);
    }

    //handle change allows for the text box to be updated
    handleChange(e) {
        const { name, value} = e.target;
        this.setState({
            [name]: value
        });
    }


    //handleSubmit makes it so the page wont reload on 
    //button click, called in form onSubmit
    handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = this.state;
        
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...initialState
            });
        }
        catch(err){
            //console.log(err);
        }

    }
    render() {
        const { email, password} = this.state

        const configAuthWrapper = {
            headline: 'Login'
        };

        return(
        <AuthWrapper {...configAuthWrapper}>
            <div className ="formWrap">
                <form onSubmit={this.handleSubmit}>
                <FormInput 
                        type="email"
                        name="email"
                        value= {email}
                        placeholder="Enter Email"
                        handleChange={this.handleChange}
                    />
                    <FormInput 
                        type="password"
                        name="password"
                        value= { password }
                        placeholder="Enter Password"
                        handleChange={this.handleChange}
                    />
                    <Link id="forgotPassword" to="/recovery">
                        Forgot Password?
                    </Link>
                    <Button type="submit">
                        LogIn
                    </Button>
                    <Button onClick={signInWithGoogle}>
                        Sign In With Goole
                    </Button>
                    <h1>Or</h1>
                    <div className="socialSignIn">
                    <Link to="/register">
                        Sign up
                    </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
}
}

export default SignIn;