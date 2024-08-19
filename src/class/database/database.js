import toastNotify from "../../components/toast/toastNotify";
import { v7 as uuidv7 } from "uuid";
import { db, storage } from "../../firebase/config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { ERROR, SUCCESS } from "../../constants/types";

class Database {
  static POSTS_COLLECTION = "posts";
  static USERS_COLLECTION = "users";
  static ROOMS_COLLECTION = "rooms";
  static POST_IMAGES_PATH = "postsImages";
  static ROOMS_PATH = "rooms";

  //! Yeni bir post oluşturur
  static async createPost(user, file, content) {
    try {
      const id = uuidv7();// Benzersiz bir ID oluşturur
      const storageRef = ref(storage, `${this.POST_IMAGES_PATH}/${user.uid}/${id}`);
      // Dosyayı yükler
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      // Post verilerini hazırlar
      const post = {
        userUid: user.uid,
        id,
        likes: [],
        userPhotoUrl: user.photoUrl,
        userName: user.userName,
        postPhotoUrl: downloadURL,
        time: serverTimestamp(),
        content,
      };

      await setDoc(doc(db, this.POSTS_COLLECTION, id), post);
      const userDoc = await getDoc(doc(db, this.USERS_COLLECTION, user.uid));
      // Kullanıcının post sayısını günceller
      await updateDoc(doc(db, this.USERS_COLLECTION, user.uid), {
        postCount: userDoc.data().postCount + 1,
      });
      
      toastNotify(SUCCESS, "The post has been uploaded successfully");
    } catch (error) {
      toastNotify(ERROR, `Failed to create post: ${error.message}`);
    }
  }
  //! Post silme
  static async deletePost(id, uid) {
    try {
      // Postu Firestore'dan siler
      await deleteDoc(doc(db, this.POSTS_COLLECTION, id));
      // İlgili post resmini depolamadan siler
      await deleteObject(ref(storage, `${this.POST_IMAGES_PATH}/${uid}/${id}`));
      
      const userDoc = await getDoc(doc(db, this.USERS_COLLECTION, uid));
      // Kullanıcının post sayısını günceller
      await updateDoc(doc(db, this.USERS_COLLECTION, uid), {
        postCount: userDoc.data().postCount - 1,
      });
      
      toastNotify(SUCCESS, "Post deleted successfully");
    } catch (error) {
      toastNotify(ERROR, `Failed to delete post: ${error.message}`);
    }
  }
  //! Post beğenme işlemi
  static async postLiked(id,userUid,isLiked){
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      likes: !isLiked ? arrayUnion(userUid) : arrayRemove(userUid),
    });
  }
  //! Kullanıcı arama işlemi
  static async searchUsers(uid, text) {
    try {
      const usersSnapshot = await getDocs(collection(db, this.USERS_COLLECTION));
      // Kullanıcıları filtreler ve döndürür
      const users = usersSnapshot.docs
        .map(doc => ({ uid: doc.id, ...doc.data() }))
        .filter(user => user.uid !== uid)
        .filter(user => 
          user.userName.toLowerCase().includes(text.toLowerCase()) ||
          user.fullname.toLowerCase().includes(text.toLowerCase())
        );

      return users;
    } catch (error) {
      toastNotify(ERROR, `Failed to search users: ${error.message}`);
    }
  }
  //! Mesajlaşma odası alır veya oluşturur
  static async getMessageRoom(personUid, userUid) {
    try {
      let roomID;
      const roomsRef = collection(db, this.ROOMS_COLLECTION);
      // Mevcut oda sorguları
      const q1 = query(roomsRef, where("user1", "==", personUid), where("user2", "==", userUid));
      const q2 = query(roomsRef, where("user2", "==", personUid), where("user1", "==", userUid));
      // Her iki sorguyu da paralel olarak çalıştırır
      const [docRef1, docRef2] = await Promise.all([getDocs(q1), getDocs(q2)]);
      // Oda varsa ID'sini alır, yoksa yeni oda oluşturur
      if (docRef1.docs.length === 0 && docRef2.docs.length === 0) {
        const room = await addDoc(roomsRef, { user1: personUid, user2: userUid, messages: [] });
        roomID = room.id;
      } else {
        roomID = docRef1.docs.length ? docRef1.docs[0].id : docRef2.docs[0].id;
      }

      return roomID;
    } catch (error) {
      toastNotify(ERROR, `Failed to get message room: ${error.message}`);
    }
  }
  //! Mesaj gönderir
  static async sendMessage(message, file, roomID, uid) {
    try {
      let downloadURL = null;
      if (file) {
        // Dosya için depolama referansı oluşturur
        const storageRef = ref(storage, `${this.ROOMS_PATH}/${roomID}/${uid}/${uuidv7()}`);
        await uploadBytes(storageRef, file);
        downloadURL = await getDownloadURL(storageRef);
      }
      // Yeni mesaj verilerini hazırlar
      const newMessage = {
        senderuid: uid,
        message: message || null,
        photoUrl: downloadURL
      };

      const roomRef = doc(db, this.ROOMS_COLLECTION, roomID);
      // Mesajı odaya ekler
      await updateDoc(roomRef, {
        messages: arrayUnion(newMessage),
      });
    } catch (error) {
      toastNotify(ERROR, `Failed to send message: ${error.message}`);
    }
  }
  //! Mesaj gönderebileceği kişileri alır
  static async getAvailableSendMessagePersons(following) {
    try {
      const q = query(collection(db, this.USERS_COLLECTION), where("__name__", "in", following));
      // Takip edilen kullanıcıları alır
      const usersSnapshot = await getDocs(q);
      
      return usersSnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
    } catch (error) {
      toastNotify(ERROR, `Failed to get available send message persons: ${error.message}`);
    }
  }
  //! Kullanıcıyı takip eder veya takipten çıkarır
  static async followUser(user, followedUser, isFollowing) {
    try {
      const userRef = doc(db, this.USERS_COLLECTION, user.uid);
      const followedUserRef = doc(db, this.USERS_COLLECTION, followedUser.uid);
       // Takip eden kullanıcıyı günceller
      await updateDoc(userRef, {
        following: isFollowing ? arrayRemove(followedUser.uid) : arrayUnion(followedUser.uid),
      });
      
      // Takip edilen kullanıcıyı günceller
      await updateDoc(followedUserRef, {
        followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });
      // Güncellenmiş kullanıcı verilerini hazırlar
      const updatedUser = {
        ...user,
        following: isFollowing
          ? user.following.filter(uid => uid !== followedUser.uid)
          : [...user.following, followedUser.uid],
      };

      toastNotify(SUCCESS, `${followedUser.userName} ${isFollowing ? "was unfollowed" : "is being followed"}.`);
      return updatedUser;
    } catch (error) {
      toastNotify(ERROR, `Failed to follow/unfollow user: ${error.message}`);
    }
  }
  //! Takip edilebilir kullanıcı önerileri getirir
  static async recommendUsers(following, uid) {
    try {
      const q = query(collection(db, this.USERS_COLLECTION), where("__name__", "not-in", [...following, uid]));
      // Önerilecek kullanıcıları alır
      const usersSnapshot = await getDocs(q);
      
      const users = usersSnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
      // Kullanıcı verilerini hazırlar ve rastgele sıralar
      const shuffled = users.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 10); // İlk 10 kullanıcıyı döndürür
    } catch (error) {
      toastNotify(ERROR, `Failed to recommend users: ${error.message}`);
    }
  }
  static async getMyProfileInfo(uid){
    try {
      const userInfo = await getDoc(doc(db, "users", uid));
      const { followers, postCount } = userInfo.data();
      return { followers, postCount };
    } catch (error) {
      toastNotify(ERROR,error.message)
    }
  }
  static async getMyPosts(uid){
    try {
      const postsQuery = query(
        collection(db, "posts"),
        where("userUid", "==", uid),
        orderBy("time", "desc")
      );
      const postsSnapshot = await getDocs(postsQuery);
      return postsSnapshot.docs.map((doc) => doc.data().postPhotoUrl);
    } catch (error) {
      toastNotify(ERROR,error.message)
    }
  }
}

export default Database;
