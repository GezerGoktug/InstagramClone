import Button from "../components/UI/Button";
import { useState } from "react";
import Loader from "../components/UI/Loader";
import Auth from "../class/auth/auth";
import { useAccount } from "../redux/auth/hooks";
import { updateLoggedUser } from "../redux/auth/actions";

const Settings = () => {
  const user = useAccount();
  const [bio, setBio] = useState(user.bio);
  const [loading, setLoading] = useState(false);
  //! Profil fotoğrafı değiştirme işlemi
  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const url = await Auth.updatePhoto(file, user.uid);
      const newUserInfo = { ...user, photoUrl: url };
      updateLoggedUser(newUserInfo);
      setLoading(false);
    }
  };
  //! Biyografi değiştirme işlemi
  const handleBioChange = async () => {
    await Auth.updateBio(bio, null);
    const newUserInfo = { ...user, bio };
    updateLoggedUser(newUserInfo);
  };
  return (
    <>
      {loading && <Loader />}
      <div className="flex-1">

        <div className="mx-4 sm:w-[600px] lg:w-[900px] sm:mx-auto ">
          <h3 className="mt-24 md:mt-12 font-bold text-4xl">Settings</h3>
          <div className="bg-zinc-200 rounded-lg flex-between flex-wrap gap-4 mt-12 p-4 ">
            <div className="flex  items-center gap-3">
              <img
                src={user.photoUrl}
                className="size-[60px]  bg-slate-400 rounded-full"
                alt=""
              />
              <div>
                <h4 className="font-bold">{user.userName}</h4>
                <h6 className="text-sm">{user.fullname}</h6>
              </div>
            </div>

            <Button className="relative text-sm bg-blue-500 rounded-lg">
              Change photo
              <input
                onChange={handleProfilePhotoChange}
                className="absolute w-full opacity-0 cursor-pointer h-full file:hidden py-4"
                type="file"
              />
            </Button>
          </div>
          <form>
            <label htmlFor="bio-title" className="block mt-12 font-bold mb-4">
              Biography:{" "}
            </label>
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              className="min-h-24 p-2 border border-slate-300 rounded-lg bg-transparent w-full"
              id="bio-title"
            ></textarea>
            <Button
              onClick={handleBioChange}
              className="bg-blue-500 rounded-lg ms-auto mt-3"
            >
              Update Bio
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
