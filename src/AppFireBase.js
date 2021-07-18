import "./App.css";
import react, { useState , useEffect } from "react";
import auth from "./firebase";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);

  // user-> user for login
  // loader-> user loading
  // error

  const handleSubmit = async () => {
    try {
      setLoader(true);
      let res = await auth.signInWithEmailAndPassword(email, password);
      console.log(res);
      setUser(res.user);
      setLoader(false);
    } catch (err) {
      setError(true);
      setLoader(false);
    }
  };

  const handleLogout = async () => {
    setLoader(true);
    await auth.signOut();
    setUser(null);
    setLoader(false);
  }

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      setUser(user);
    })
  })

  return (
    <>
      {error == true ? (
        <h1>Wrong credentials</h1>
      ) : loader == true ? (
        <h1>Loading...</h1>
      ) : user != null ? (
        <>
        <h1>logged in by {user.uid}</h1>
        <button onClick={handleLogout}>Logout</button>
        </>
        
      ) : (
        <>
          <h1>Login Form</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>

          <input type="button" value="submit" onClick={handleSubmit}></input>
        </>
      )}
    </>
  );
}

export default App;
