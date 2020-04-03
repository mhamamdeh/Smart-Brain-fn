import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

class Singin extends React.Component {

    constructor(props) {
        super();
        this.state = {
            signinEmail: '',
            signinPassword: '',
            WrongMsg: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signinEmail: event})
    }

    onPasswordChange = (event) => {
        this.setState({signinPassword: event})
    }

    onSubmitClick = () => {
        fetch('https://fast-reef-20722.herokuapp.com/signin' , {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signinEmail,
                password: this.state.signinPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.ID) {
                this.props.loadUser(user);
                this.props.onChangeRoute('home')
            }else {
                this.setState({WrongMsg: user})
            }
        })
    }

    render(){
        const {onChangeRoute} = this.props;
        return(
            <div>
                <Formik
                    initialValues={{email: '' , password: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        this.onEmailChange(values.email);
                        this.onPasswordChange(values.password);
                        this.onSubmitClick();
                        setSubmitting(false);
                    }, 400);
                    }}

                    //here we will define the calidation

                    validationSchema = {yup.object().shape({
                        email: yup.string().required('Email is Required'),
                        password: yup.string().required('Password is Required')
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

                            return(
                                <form id="v2" autoComplete='off' onSubmit={handleSubmit} className='center'>
                                    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
                                        <main className="pa4 black-80">
                                            <div className="measure">
                                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                                    <div className="mt3 tl">
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
                                                    <div className="mv3 tl">
                                                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
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
                                                <div className="">
                                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f8 dib"
                                                        type="submit" 
                                                        value="Sign in"
                                                        disabled={isSubmitting}
                                                        />
                                                </div>
                                                <div className="lh-copy mt3">
                                                    <p onClick={() => onChangeRoute('register')} className="f6 link dim black db pointer">Register</p>
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

export default Singin;