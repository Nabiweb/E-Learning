import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, firestore } from "../firebase";

const TeachersAuth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [signUpData, setSignUpData] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  // Show message with fade-out effect
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  // Handle sign-up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { email, password, firstName, lastName } = signUpData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = { email, firstName, lastName };

      await setDoc(doc(firestore, 'users', user.uid), userData);
      alert('Account Created Successfully');
      //setTimeout(() => navigate('/'), 1000); // Redirect to index
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists!', 'error');
      } else {
        showMessage('Unable to create user', 'error');
        console.error('Sign-up error:', error);
      }
    }
  };

  // Handle sign-in form submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = signInData;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('loggedInUserId', userCredential.user.uid);
      showMessage('Login is successful', 'success');
      setTimeout(() => navigate('/teachers-home'), 1000); // Redirect to homepage
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        showMessage('Incorrect Password', 'error');
      } else if (error.code === 'auth/user-not-found') {
        showMessage('Account does not Exist', 'error');
      } else {
        showMessage('An error occurred', 'error');
        console.error('Sign-in error:', error);
      }
    }
  };

  // Handle input changes
  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  return (
    <div className='p-5 h-screen flex flex-col justify-between'>
      <div >
        <div className="flex justify-center items-center">
            <img src="https://img.icons8.com/?size=100&id=VPahQZa1Dl8N&format=png&color=000000" className="max-w-full h-auto" alt="Icon"/>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>

        {message.text && (
          <div
            className={`mb-4 p-4 rounded text-white transition-opacity duration-1000 ${
              message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } ${message.text ? 'opacity-100' : 'opacity-0'}`}
          >
            {message.text}
          </div>
        )}

        {isSignUp ? (
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={signUpData.firstName}
                onChange={handleSignUpChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={signUpData.lastName}
                onChange={handleSignUpChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="rEmail">
                Email
              </label>
              <input
                type="email"
                id="rEmail"
                name="email"
                value={signUpData.email}
                onChange={handleSignUpChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="rPassword">
                Password
              </label>
              <input
                type="password"
                id="rPassword"
                name="password"
                value={signUpData.password}
                onChange={handleSignUpChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#10b461] text-white py-2 rounded-lg hover:bg-[#10b461] transition"
            >
              Sign Up as a Teacher's
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={signInData.email}
                onChange={handleSignInChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={signInData.password}
                onChange={handleSignInChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#10b461] text-white py-2 rounded-lg hover:bg-[#10b461] transition"
            >
              Sign In as a Teacher's
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 hover:text-blue-700 font-semibold transition"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>

      <div className='py-5'>
        <Link to='/students-auth' className='bg-blue-600 flex item-center justify-center text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg placeholder:text-base'>
        Sign Up as a Student's</Link>
      </div>
    </div>
  );
};

export default TeachersAuth;
