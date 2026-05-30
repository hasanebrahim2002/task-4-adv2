import {
  useRef,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";

interface Input {
  label?: string;
  name: string;
  placeholder?: string;
  type: string;
}
interface FormProps<T> {
  logo: string;
  title: string;
  paraTitle: string;
  inputs: Array<Input>;
  submit: string;
  initialData: T;
  className: string;
  setData: Dispatch<SetStateAction<T>>;
  loading: boolean;
}
// interface FormData {
//   email: string;
//   password: string;
// }
const Form = <T,>({
  logo,
  title,
  paraTitle,
  inputs,
  submit,
  initialData,
  className,
  setData,
  loading,
}: FormProps<T>) => {
  const data = useRef<T>(initialData);
  function sendData(e: FormEvent) {
    e.preventDefault();
    console.log(data.current);
    setData(data.current);
  }
  const [preview, setPreview] = useState<string>("");
  return (
    <div className={`form ${className}`}>
      <div className="auth-img">
        <img src={logo} alt="" />
      </div>
      <h2>{title}</h2>
      <p className="paraTitle">{paraTitle}</p>
      <form onSubmit={sendData}>
        {inputs.map((input: Input, index: number) => {
          return (
            <div
              key={index}
              className={`auth-div-input ${input.type != "email" && input.type != "file" ? "inline" : ""} ${input.type == "file" ? "imgeDiv" : ""}`}
            >
              <label htmlFor="">{input.label}</label>
              {input.type != "file" ? (
                <input
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  onChange={(e) => {
                    const name = input.name as keyof T;
                    data.current[name] = e.target.value as T[keyof T];
                  }}
                  required
                />
              ) : (
                <div className="upload-container">
                  <label htmlFor="profile-upload" className="upload-box">
                    <img
                      src={preview || "/task-4-adv2/assets/UploadFile.png"}
                      alt=""
                    />
                  </label>
                  <input
                    id="profile-upload"
                    type={input.type}
                    name={input.name}
                    className="fileImage"
                    required
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      setPreview(URL.createObjectURL(file));

                      const name = input.name as keyof T;
                      data.current[name] = file as T[keyof T];
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
        <button type="submit" className="authSubmit" disabled={loading}>
          {loading ? "Loading..." : submit}
        </button>
      </form>
    </div>
  );
};

export default Form;
