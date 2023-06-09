import { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      console.log(res);
      setError(false);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      uploadTask.on(
        "state_changed",

        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
          });
        }
      );
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          {error ? (
            <div style={{ color: "red", paddingBottom: "7px" }}>
              <h3>"Something went wrong"</h3>
            </div>
          ) : (
            ""
          )}
          <span className="logo">Chat House</span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Display Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="file" id="file" style={{ display: "none" }} />
            <label htmlFor="file">
              <img src={Add} alt="Label File" />
              <span>Add an avatar</span>
            </label>
            <button>Sign Up</button>
          </form>
          <p>You do have an account? Login</p>
        </div>
      </div>
    </>
  );
};

export default Register;
