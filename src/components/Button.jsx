const Button = ({onClick, type, className, title}) => {
    return ( 

        <button onClick={onClick} type={type} className={className}>{title}</button>

     );
}
 
export default Button;