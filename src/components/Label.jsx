const Label = ({name, title}) => {
    return ( 

        <label htmlFor={name} className="text-white w-full">{title}: </label>

     );
}
 
export default Label;