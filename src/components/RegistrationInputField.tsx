import type { RegistrationInputField } from "../types/registrationInputField";

const RegistrationInputField: React.FC<RegistrationInputField> = ({
  label,
  errors,
  type,
  id,
  register,
  name,
  errorMessage,
}) => {
  return (
    <div className="w-full ">
      <label className="block text-sm " htmlFor="name">
        {label}
      </label>
      <input
        className={`w-full border  ${
          errors ? ` border-red` : ` border-slate-400`
        }   outline-none`}
        type={type}
        id={id}
        {...register(name)}
        name={name}
      />
      {errors && <div className="text-xs text-red">{errorMessage}</div>}
    </div>
  );
};

export default RegistrationInputField;
