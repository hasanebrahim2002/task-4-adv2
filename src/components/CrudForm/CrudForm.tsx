import {
  useRef,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import "./CrudForm.css";
interface inputCrud {
  type: string;
  name: string;
  placholder?: string;
  content: string;
  value?: string;
}
interface CrudFormProps {
  titleCrud: string;
  inputsCrud: Array<inputCrud>;
  submitCrud: string;
  setData: Dispatch<SetStateAction<CrudData>>;
  setSubmit: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}
interface CrudData {
  name: string;
  price: string;
  image: Blob | null;
}
const CrudForm = ({
  titleCrud,
  inputsCrud,
  submitCrud,
  setData,
  setSubmit,
  loading,
}: CrudFormProps) => {
  const [preview, setPreview] = useState<string>("");

  const data = useRef<CrudData>({
    name: "",
    price: "",
    image: null,
  });
  function sendData(e: FormEvent) {
    e.preventDefault();
    setData(data.current);
    setSubmit(true);
  }
  return (
    <div className="crudMain">
      <Link to="/dashboard" className="backDetails">
        <IoIosArrowBack />
      </Link>
      <h1>{titleCrud}</h1>
      <form action="" onSubmit={sendData}>
        <div className="feildsCrud">
          {inputsCrud.map((input, index) => {
            return (
              <div key={index}>
                <label htmlFor={input.name}>{input.content}</label>
                {input.type == "file" ? (
                  <div className="upload-container">
                    <label htmlFor="profile-upload" className="crudupload-box">
                      <img
                        src={
                          preview
                            ? preview
                            : input.value
                              ? input.value
                              : "/task-4-adv2/assets/UploadFile.png"
                        }
                        onError={(e) => {
                          e.currentTarget.src =
                            "/task-4-adv2/assets/defaultProduct.png";
                        }}
                        alt=""
                      />
                    </label>
                    <input
                      id="profile-upload"
                      type={input.type}
                      name={input.name}
                      className="fileImage"
                      required={input.value ? false : true}
                      defaultValue={input.value}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPreview(URL.createObjectURL(file));
                          data.current = {
                            ...data.current,
                            [input.name]: file,
                          };
                        }
                      }}
                    />
                  </div>
                ) : (
                  <input
                    type={input.type}
                    id={input.name}
                    placeholder={input.placholder}
                    onChange={(e) =>
                      (data.current = {
                        ...data.current,
                        [input.name]: e.target.value,
                      })
                    }
                    defaultValue={input.value}
                    required
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="addProductBtn">
          <button type="submit" value={submitCrud} disabled={loading}>
            {loading ? "Loading..." : submitCrud}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrudForm;
