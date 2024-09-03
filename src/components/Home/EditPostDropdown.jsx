import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Database from "../../class/database/database";

const EditPostDropdown = ({ id, isDoEdit }) => {
  //! Gönderi silme
  const deletePost = async () => await Database.deletePost(id);
  return (
    <>
      <Menu>
        <MenuButton>
          <HiOutlineDotsHorizontal />
        </MenuButton>
        {isDoEdit && (
          <MenuItems
            anchor="bottom end"
            className="p-4 bg-white border border-zinc-300 shadow-lg shadow-black/20 rounded-lg"
          >
            <MenuItem>
              <div className="p-1 text-lg  flex gap-2 items-center font-medium">
                <FaEdit />
                Edit
              </div>
            </MenuItem>
            <MenuItem>
              <div
                onClick={deletePost}
                className="p-1 cursor-pointer text-lg  flex gap-2 items-center font-medium"
              >
                <FaTrash />
                Delete Post
              </div>
            </MenuItem>
          </MenuItems>
        )}
      </Menu>
    </>
  );
};

export default EditPostDropdown;
