const Select = ({name, onChange, value, option}) => {
    return ( 
         <select name={name} id={name} onChange={onChange} value={value} className="text-white bg-blue-500 ">
               {option.map((data)=>(
                 <option key={data.value} value={data.value}>{data.title}</option>
               ))}
                
        </select>
     );
}
 
export default Select;