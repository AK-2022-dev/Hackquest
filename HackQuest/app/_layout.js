import React, { useState, useEffect } from 'react';    //importing all the hooks from the react
import { Slot } from 'expo-router';    //the current screeen renders here
import LoadingScreen from '../components/LoadingScreen';   //importing our component that we have made earlier

//main function call
export default function Layout() {
  const [isReady, setIsReady] = useState(false);    //isReady is to check whether the app has finshed laoding or not
                                                    //setting it false 
  //useEffect is a react hook that renders side components one the conatiner loads
  useEffect(() => {
    const loadApp = async () => {       //we created a loadApp func in which we used Async func.
      // Simulate loading delay (replace with actual logic if needed)
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsReady(true);  //sets isReady func true 
    };
    //calling of the function
    loadApp();
  }, []);
  //checking the condition...
  if (!isReady) {
    return <LoadingScreen />;
  }

  return <Slot />;    //if is ready is true we will be slots will be laoding which contains actual screens.
}


//why Async??
//Async because it will wait for some asynchronous operation like fetching data or loading assets

//Await new promise????
//basically we create a new promise which is also aysnc and then await it for the time specified
//This simulates a delay — like waiting for something to load API call, fonts, images, etc.
//remeber------this is not an actual logic ???