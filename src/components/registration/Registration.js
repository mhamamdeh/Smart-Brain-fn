import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

class Registration extends React.Component {
    constructor(props){
        super();
        this.state = {
            email: '',
            password: '',
            name: '',
            WrongMsg: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event})
    }

    onPasswordChange = (event) => {
        this.setState({password: event})
    }

    onNameChange = (event) => {
        this.setState({name: event})
    }

    onSubmitClick = () => {
        fetch('https://fast-reef-20722.herokuapp.com/register' , {
            method: 'post',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.ID) {
                this.props.loadUser(user)
                this.props.onChangeRoute('home')
            }else {
                this.setState({WrongMsg: user});
            }
            
        })
    }

    render() {
        return(
            <div>
                <Formik
                    initialValues={{name: '' , email: '' , password: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        this.onNameChange(values.name);
                        this.onEmailChange(values.email);
                        this.onPasswordChange(values.password);
                        this.onSubmitClick();
                        setSubmitting(false);
                    }, 400);
                    }}

                    //here we will define the calidation

                    validationSchema = {yup.object().shape({
                        name: yup.string().required('Name is Required'),
                        email: yup.string().email().required('Email is Required'),
                        password: yup.string().required('No Password Provided')
                                            .min(8 , 'Password is too short - should be 8 chracters long')
                                            .matches(/(?=.*[0-9])/ , 'Passowrd should contain a number')
                    })}>
                    {props => {
                        const {
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        /* and other goodies */
                            } = props;

                    return (
                        <form autoComplete='off' onSubmit={handleSubmit} className='center'>
                            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-100-l mw6 shadow-2">
                                <main className="pa4 black-80">
                                    <div className="measure">
                                        <fieldset id="sign_Registerup" className=" mv20 ba b--transparent ph0 mh0">
                                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                                            <div className="mt3">
                                                <label className="w-100 tl db fw6 lh-copy f5" htmlFor="Name">Name</label>
                                                <input onChange={handleChange}
                                                        className={errors.name && touched.name && "pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 error" 
                                                                    || 'pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'}
                                                        type="text" 
                                                        name="name"  
                                                        id="name"
                                                        onBlur={handleBlur}
                                                        value={values.name} 
                                                        />
                                                {errors.name && touched.name && (
                                                    <div className='input-feedback'>
                                                        {errors.name}
                                                    </div>
                                                )} 
                                            </div>
                                            <div className="mt3">
                                                <label className="w-100 tl db fw6 lh-copy f5" htmlFor="email">Email</label>
                                                <input onChange={handleChange} 
                                                        className={errors.email && touched.email && 'pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 error'
                                                                    || 'pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'} 
                                                        type="email" 
                                                        name="email"  
                                                        id="email"
                                                        onBlur={handleBlur}
                                                        value={values.email} 
                                                        />
                                                {errors.email && touched.email && (
                                                    <div className='input-feedback'>
                                                        {errors.email}
                                                    </div>
                                                )}       
                                            </div>
                                            <div className="mt3">
                                                <label className="tl db fw6 lh-copy f5" htmlFor="password">Password</label>
                                                <input onChange={handleChange}
                                                        className={errors.password && touched.password && 'pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 error'
                                                                   || 'pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' }
                                                        type="password" 
                                                        name="password"  
                                                        id="password"
                                                        onBlur={handleBlur}
                                                        value={values.password} 
                                                        />
                                                {errors.password && touched.password && (
                                                    <div className='input-feedback'>
                                                        {errors.password}
                                                    </div>
                                                )} 
                                            </div>
                                        </fieldset>
                                            <div className="App">
                                                <button 
                                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                                    type="submit" 
                                                    value="Register"
                                                    disabled={isSubmitting}>
                                                    Register
                                                    </button>
                                            </div>
                                            <div className='input-feedback center'>
                                                {this.state.WrongMsg}   
                                            </div>
                                    </div>
                                </main>
                            </article>
                        </form>
                    )
                }
            }
            </Formik>
            </div>
        );
    }
}

export default Registration;