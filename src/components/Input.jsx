const Input = ({name, value, onChange, type}) => {
    return ( 
         <input type={type} name={name} id={name} value={value} onChange={onChange} className="border-b border-white text-white w-full" />
     );
}
 
export default Input;