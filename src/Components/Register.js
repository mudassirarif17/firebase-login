import React from 'react'

export default function Register(props) {
  let msgClass = ["text-center"];
  if(props.type){
    msgClass.push("text-danger");
  }
  else{
    msgClass.push("text-success");
  }
  return (
    <div className='container'>
      <h1 className='text-center'>Created Account</h1>
      <p className='text-center'>Get started with your free account</p>
      <p className={msgClass.join(" ")}>{props.message}</p>
      <form onSubmit={props.register}>
      <div>
        <a className='btnTwiter btn' onClick={props.signUpGoggle} type='button'>Sign Up with Google</a>
      </div>
      <div>
        <a className='btnFB btn' type='button'>Login with Facebook</a>
      </div>
      <div className='hrBar'>
      <hr className='hrLine'/><div className='text-center'>OR</div><hr className='hrLine' />
      </div>
      <div >
        <input className='inpTag' type="email" placeholder='Email Address' name='email'></input>
      </div>
      <div>
        <input className='inpTag' type="password" placeholder='Create Password' name='password'></input>
      </div>
      <div>
        <input className='inpTag' type="password" placeholder='Repeat Password' name='confirmpassword'></input>
      </div>
      <div>
        <button type='submit' className='btn accBtn'>Create an account</button>
      </div>
      <div className='haveAcc'>
        <span>Have an account ? </span>
        <a href='#' onClick={props.pageChange}>Login</a>
      </div>
      </form>
    </div>
  )
}
