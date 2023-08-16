import "./input-field.scss";

const Input = ({label, type, placeholder, }) => {
  return (
    <div>
        <label className="input-label">{label}</label>
    </div>
  );
};

export default Input;
