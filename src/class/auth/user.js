import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

class User {
  constructor(user) {
    const { displayName, uid, photoURL, fullname } = user;
    this.userName = displayName;
    this.uid = uid;
    this.photoUrl = photoURL;
    this.bio = "";
    this.fullname = fullname;
    this.following = [];
  }
  //! Kullanıcı verilerini kontrol eder ve gerekiyorsa veritabanında oluşturur.
  static async handleUser(user) {
    const newUser = new User(user);
    const userDocData = await newUser.controlIsUserInDatabase();
    if (userDocData) {
      //! Kullanıcı veritabanında mevcutsa, bilgileri güncelle
      newUser.bio = userDocData.bio;
      newUser.fullname = userDocData.fullname;
      newUser.following = userDocData.following;
      //! Kullanıcı veritabanında mevcut değilse, yeni kullanıcı verisi oluştur
    } else await newUser.createUserDataInDatabase();

    return newUser;
  }
  //! Kullanıcının veritabanında olup olmadığını kontrol eder.
  async controlIsUserInDatabase() {
    const docRef = doc(db, "users", this.uid);
    const userDocData = await getDoc(docRef);
    return !userDocData.exists() ? null : userDocData.data();
  }
  //! Kullanıcı verilerini veritabanında oluşturur.
  async createUserDataInDatabase() {
    const data = {
      userName: this.userName,
      fullname: this.fullname,
      photoUrl: this.photoUrl,
      followers: [],
      following: [],
      bio: "",
      postCount: 0,
    };
    await setDoc(doc(db, "users", this.uid), data);
  }
  //! User nesnesini Redux state'ine uygun formata dönüştürür.
  toReduxState() {
    return {
      userName: this.userName,
      fullname: this.fullname,
      photoUrl: this.photoUrl,
      uid: this.uid,
      following: this.following,
      bio: this.bio,
    };
  }
}

export default User;
