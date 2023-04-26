import React from 'react'

export default function Login(props) {
  let msgClass = ["text-center"];
  if(props.type){
    msgClass.push("text-danger");
  }
  else{
    msgClass.push("text-success");
  }
  return (
    <div className='container'>
      <h1 className='text-center'>Login</h1>
      <p className='text-center'>Login free</p>
      <p className={msgClass.join(" ")}>{props.message}</p>
      <form onSubmit={props.login}>
      <div>
        <a className='btnTwiter btn' type='button'>Login via twiter</a>
      </div>
      <div>
        <a className='btnFB btn' type='button'>Login via facebook</a>
      </div>
      <div className='hrBar'>
      <hr className='hrLine'/><div className='text-center'>OR</div><hr className='hrLine' />
      </div>
      <div >
        <input className='inpTag' type="email" placeholder='Email Address' name='email'></input>
      </div>
      <div>
        <input className='inpTag' type="password" placeholder='Write Password' name='password'></input>
      </div>
      <div>
        <button type='submit' className='btn accBtn'>Login</button>
      </div>
      <div className='haveAcc'>
        <span>Create an account ? </span>
        <a href='#' onClick={props.pageChange}>Login</a>
      </div>
      </form>
    </div>
  )
}
