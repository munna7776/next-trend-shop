import {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

type InputProps<T> = {
  labelText?: string;
  placeholder?: string;
  name: Path<T extends FieldValues ? T : any>;
  type?: "text" | "password" | "number" | "checkbox";
  className?: string;
  register: UseFormRegister<T extends FieldValues ? T : any>;
  rules?: RegisterOptions;
  error?: string;
};

const Input = <T extends unknown>({
  labelText = "",
  placeholder,
  name,
  type = "text",
  className = "",
  register,
  rules,
  error = "",
}: InputProps<T>) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {
        labelText && (
          <label
            className={`text-[#333333] text-lg font-medium ${
              error ? "text-[#dc3545]" : ""
            }`}
            htmlFor={name}
          >
            {labelText}
          </label>
        )
      }
      <input
        {...register(name, rules)}
        type={type}
        placeholder={placeholder}
        id={name}
        className={`focus:outline-none mt-[10px] border border-[#ccccd7] px-[10px] py-[10px] rounded-md text-[#5f5f7c] text-lg ${
          error ? "border-[#dc3545]" : ""
        } `}
      />
      {error && <small className="text-[#dc3545] mt-1">{error}</small>}
    </div>
  );
};

export default Input;
