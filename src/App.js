import React, { Component } from 'react'
import Login from './Components/Login';
import Register from './Components/Register';
import "./App.css";
//1. Code for firebase
import { initializeApp } from "firebase/app";
// 2.this line is for sending some data on fire base 
import { getDatabase , ref ,set } from "firebase/database";
// 3. Code for Authentication on fire base 
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword , GoogleAuthProvider, signInWithPopup , sendEmailVerification  } from "firebase/auth";

// 4. fire base configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBwkgN5-fnfAlMa6urtbv7_yODvB9plq8",
  authDomain: "dj-survey-bb50d.firebaseapp.com",
  databaseURL: "https://dj-survey-bb50d-default-rtdb.firebaseio.com",
  projectId: "dj-survey-bb50d",
  storageBucket: "dj-survey-bb50d.appspot.com",
  messagingSenderId: "468745298364",
  appId: "1:468745298364:web:f35aee110f774c696d0bb9"
};

// 5. Initialize Firebase
const app = initializeApp(firebaseConfig);
// For Goggle signUp
const provider = new GoogleAuthProvider();

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      // 0 -. login & 1 -> register 
       page : 0,
       message : " ",
      //  0 for success 1 for danger
       type : 1,
       email : " ",
       password : " ",
    }
  }

  // This code create an account on Firebase 
  registerHandler = (event) =>{
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmpassword = event.target.confirmpassword.value;
    if(password !== confirmpassword){
        this.setState({message : "Password does not match"});
    }
    // 6. creating an account on firebase using email and password
    const auth = getAuth(app);
    // 9. sending mail at the time of creating user
    createUserWithEmailAndPassword(auth , email, password)
    .then((userCredential)=>{
      const user = userCredential;
      sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        console.log(auth.currentUser);
      });
    
      this.setState({message : "Account created Successfully" , type : 0});
      event.target.email.value = "";
      event.target.password.value = "";
      event.target.confirmpassword.value = "";
      // console.log(user);
    })
   .catch((error)=>{
    const errorCode = error;
      this.setState({message : error.message , type : 1});
      // console.log(errorCode);
    });
    // alert();
  }

// 7. this code is used if you have already account on firebase (sign in process)
  loginHandler = (event) =>{
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // 8. if user has verified their account so login other wise not
    if(userCredential.user.emailVerified === true){
    // Signed in 
    this.setState({message : "Login SuccessFully" , type : 0 , email : " " , password : " "});
    }else{
      this.setState({message : "Your email is not verified yet"});
    }
    const user = userCredential.user;
    // console.log(user);
  })
  .catch((error) => {
    this.setState({message : error.message , type : 1})
    const errorCode = error.code;
    console.log(errorCode);
    // const errorMessage = error.message;
  });
    // alert();
  }

  // 10. Code for google signup
  googleLoginHandler = (e)=>{
    e.preventDefault();
    const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error.message);
  });
    // alert();
  }

  pageChangeHandler = (e)=>{
    e.preventDefault();
    this.setState({page : !this.state.page , email : " " , password :" ",})
  }
  render() {
    return (
      <div>
        {this.state.page ? 
        <Register 
        signUpGoggle={this.googleLoginHandler}
        message={this.state.message} 
        type={this.state.type} 
        pageChange={this.pageChangeHandler} 
        register={this.registerHandler}/> :
        <Login 
        message={this.state.message} 
        type={this.state.type} 
        pageChange={this.pageChangeHandler} 
        login={this.loginHandler}/>}
      </div>
    )
  }
}

export default App;
