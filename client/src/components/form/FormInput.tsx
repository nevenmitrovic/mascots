type FormInputProps = {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
};

const FormInput = ({
  name,
  type = "text",
  label,
  placeholder,
  defaultValue = undefined,
}: FormInputProps) => {
    return (
        <div className="form-input">
        {label && <label htmlFor={name}>{label}</label>}
        <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
        />
        </div>
    );
};

export default FormInput;
