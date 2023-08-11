import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type Props<T> = {
  labelText?: string;
  name: Path<T extends FieldValues ? T : any>;
  register: UseFormRegister<T extends FieldValues ? T : any>;
};

const Checkbox = <T extends unknown>({
  labelText,
  name,
  register,
}: Props<T>) => {
  return (
    <div className="flex gap-x-[10px] items-center">
      <input
        {...register(name)}
        type="checkbox"
        id={name}
        className="focus:outline-none h-5 w-5 border border-[#ccccd7] rounded-md"
      />
      {labelText && (
        <label className="text-[#333333] text-lg font-medium" htmlFor={name}>
          {labelText}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
