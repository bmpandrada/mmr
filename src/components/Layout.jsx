const Layout = ({children}) => {
    return (
        <div className="font-poppins max-w-full mx-auto">
            <h1 className="text-sm lg:text-lg font-bold text-center transition duration-300 underline">My Message Reminder</h1>
            {children}
        </div>
      );
}
 
export default Layout;