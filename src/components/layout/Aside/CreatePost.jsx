import Button from "../../UI/Button";
import { useFormik } from "formik";
import { FaSpinner } from "react-icons/fa";
import Database from "../../../class/database/database";
import Modal from "../../UI/Modal";
import { closeModal } from "../../../redux/modal/actions";

const CreatePost = () => {

  //! Gönderi yükleme
  const onSubmit = async (values) => {
    const { file, content } = values;
    await Database.createPost( file, content);
    closeModal();
  };
  const { handleChange, setFieldValue, values, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        file: null,
        content: "",
      },
      onSubmit,
    });
  return (
    <Modal>
      <h6 className="font-semibold border-b pb-4 -mx-6 border-slate-300 text-center text-xl">
        Create Post
      </h6>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3 mt-4">
          <label className="text-xl">İmage:</label>
          <label htmlFor="file-input" className="sr-only">
            Choose file
          </label>
          <input
            onChange={(e) => setFieldValue("file", e.target.files[0])}
            type="file"
            name="file"
            id="file"
            className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
          file:bg-blue-500 file:border-0
          file:text-white
            file:font-semibold
            file:me-4
            file:py-2 file:px-4
            "
          />
        </div>
        <textarea
          value={values.content}
          name="content"
          onChange={handleChange}
          placeholder="Bir şeyler yazın"
          className=" min-h-32 rounded-lg border w-full border-slate-300 mt-4 p-2"
        ></textarea>
        <Button
          disabled={isSubmitting}
          type="submit"
          className="bg-blue-500 rounded-lg ms-auto disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin text-xl" />
              <span>Sharing</span>
            </>
          ) : (
            "Share"
          )}
        </Button>
      </form>
    </Modal>
  );
};

export default CreatePost;
