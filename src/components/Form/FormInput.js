export default function FormInput({type, label, value, name, placeholder, onChange}) {
    return(
        <div className={`flex flex-col p-2`}>
            <label className={`block font-bold justify-self-start`}>{label}</label>
            <input
                title={`auth-form-input-${label}`}
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className={`p-2 rounded focus:ring focus:ring-primary border border-secondary outline-secondary`}
            />
        </div>
    );
}