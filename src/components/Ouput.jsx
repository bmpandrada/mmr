const Output = ({data, handleDelete, handleUpdate}) => {
    return ( 

        <div className="bg-white rounded-none max-w-md mx-auto mt-2 px-2 py-2 shadow-xl">
                <ul>
                    {data.map(({id, name, lastname, priority, message, createdAt, updatedAt})=> (
                      <li key={id}>
                        <h2><strong>Fullname: </strong> <span className="capitalize line-clamp-">{lastname}, {name}</span></h2>
                        <p><strong>Priority: </strong><span className="capitalize">{priority}</span></p>
                          {message ? 
                          
                          <>
                          <h3><b>Message:</b></h3>
                          <p className="text-gray-500">{message}</p>  
                          </>
                          : ''
                        }

                         <p className="text-xs text-gray-400">
                          Created: {new Date(createdAt).toLocaleString()}
                        </p>
                        {createdAt !== updatedAt ? (
                          <p className="text-xs text-gray-400">
                          Updated: {new Date(updatedAt).toLocaleString()}
                        </p>
                        ): ''}


                        <button onClick={()=> handleDelete(id)} className="bg-red-500 hover:bg-red-800 rounded text-white py-2 px-5 cursor-pointer mt-5 mr-2 transition duration-300">
                          Delete
                        </button>

                        <button onClick={()=> handleUpdate(id)} className="bg-green-500 hover:bg-green-800 rounded text-white py-2 px-5 cursor-pointer mt-5 transition duration-300">
                          Update
                        </button>
                      </li>
                    ))}
                </ul>
              </div>

     );
}
 
export default Output;