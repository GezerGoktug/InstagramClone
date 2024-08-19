import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, FacebookProvider, storage } from "../../firebase/config";
import toastNotify from "../../components/toast/toastNotify";
import User from "./user";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ERROR, SUCCESS } from "../../constants/types";

class Auth {
  //! Kayıt olma işlemi
  static async register(email, password, userName, fullname) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: "/img/defaultprofile.png",
      });
      const { displayName, uid, photoURL } = user;
      toastNotify(SUCCESS, "Register success");
      return User.handleUser({ displayName, uid, photoURL, fullname });
    } catch (error) {
      let message = null;
      if (error.code === "auth/email-already-in-use")
        message = "This email is already in use.";
      toastNotify(ERROR, message || error.message);
    }
  }
  //! Giriş yapma işlemi
  static async login(email, password) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const { displayName, uid, photoURL } = user;
      toastNotify(SUCCESS, "Login success");
      return User.handleUser({ displayName, uid, photoURL, fullname: "" });
    } catch (error) {
      toastNotify(ERROR, error.message);
    }
  }
  //! Facebook ile giriş yapma işlemi
  static async authWithFacebook() {
    try {
      const { user } = await signInWithPopup(auth, FacebookProvider);
      const { displayName, uid, photoURL } = user;
      toastNotify(SUCCESS, "Login success");
      return User.handleUser({
        displayName,
        uid,
        photoURL,
        fullname: displayName,
      });
    } catch (error) {
      toastNotify(ERROR, error.message);
    }
  }
  //! Çıkış yapma işlemi
  static async logout() {
    try {
      await signOut(auth);
      toastNotify(SUCCESS, "Logout success");
    } catch (error) {
      toastNotify(ERROR, error.message);
    }
  }
  //! Hesap biography  güncelleme
  static async updateBio(bio) {
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        bio,
      });

      toastNotify(SUCCESS, "Update your biography successfully");
    } catch (error) {
      toastNotify(ERROR, error.message);
    }
  }
  //! Hesap fotoğrafı güncelleme
  static async updatePhoto(file, uid) {
    try {
      //! Profil fotosunu storage'e kaydetme
      const storageRef = ref(storage, `profilePictures/${uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      });
      await updateDoc(doc(db, "users", uid), {
        photoUrl: downloadURL,
      });
      const postsQuery = query(
        collection(db, "posts"),
        where("userUid", "==", uid)
      );
      const postsSnapshot = await getDocs(postsQuery);
      //! Firestore'da toplu yazma işlemi
      const batch = writeBatch(db);
      //! Bizim Paylaştığımız postlardaki profil  fotoğraflarımızı güncelliyoruz.
      postsSnapshot.forEach((postDoc) => {
        const postRef = doc(db, "posts", postDoc.id);
        batch.update(postRef, { userPhotoUrl: downloadURL });
      });
      batch.commit(); // Toplu yazma işlemini gerçekleştir
      toastNotify(SUCCESS, "Update your profile photo successfully");
      return downloadURL;
    } catch (error) {
      toastNotify(ERROR, error.message);
    }
  }
}

export default Auth;
