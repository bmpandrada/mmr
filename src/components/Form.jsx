      import { useEffect } from "react";
      import { useState } from "react";

      const Form = () => {
        const [isFormData, setFormData] = useState({
          name:"",
          lastname:"",
          status: "single",
          message:'',
        });

        const [isData, setData] = useState([]);
        const [isUpdate, setUpdate] = useState(null);
        const [addForm, setAddForm] = useState(true)

        useEffect(()=> {
          const dataInserted = JSON.parse(localStorage.getItem('data-form') || '[]');
          if(dataInserted.length > 0) {
            setData(dataInserted)
          }
        },[])

        useEffect(()=> {
          localStorage.setItem('data-form', JSON.stringify(isData))
        },[isData]) 

        const handleClhange = (e) => {
              setFormData({
                ...isFormData,
                [e.target.name]: e.target.value
              })
        }

        const handleSubmit = (e) => {
              e.preventDefault();
              if(!isFormData.name || !isFormData.lastname) return;


              if(isUpdate !== null) {
              const updateData = isData.map((dataItem)=> (
                  dataItem.id === isUpdate.id ? {...dataItem, ...isFormData, updatedAt: new Date().toISOString(),}: dataItem)
                )

                const confirmUpdate = window.confirm('confirm update?')
                if(confirmUpdate) {
                  setData(updateData);
                  setUpdate(null);
                }

              }else {
                const newData = {id: Date.now(), ...isFormData,  createdAt: new Date().toISOString(), 
                updatedAt: new Date().toISOString(),};
                setData([newData, ...isData]);
              }
              setFormData({
                name:"",
                lastname:"",
                status: "single",
                message:'',
              })
               setAddForm(true)
        }

        const handleDelete = (id) => {
              const deleteData = isData.filter((data)=> data.id !== id)
              if(isData.length > 0) {
                  const confirmUpdate = window.confirm('confirm delete?')
                  if(confirmUpdate) {
                    setData(deleteData)
                  }
              }
        }


        const handleUpdate = (id) => {
            const forUpdate = isData.find((dataUpdate)=> dataUpdate.id === id);
            setFormData({
              name: forUpdate.name,
              lastname: forUpdate.lastname,
              status: forUpdate.status,
              message: forUpdate.message
            })

            setUpdate(forUpdate)
            setAddForm(false)
        }


        const handleCancel = () => {
            setFormData({
              name:'',
              lastname:'',
              status:'single',
              message:'',
            })
            setUpdate(null)
            setAddForm(true)
        }


        const newForm = () => {
           setAddForm(false)
        }



        return ( 
          <>
          

            {isData.length > 0 && (
              <div className="bg-white rounded-none max-w-md mx-auto mt-2 px-2 py-2 shadow-xl">
                <ul>
                    {isData.map(({id, name, lastname, status, message, createdAt, updatedAt})=> (
                      <li key={id}>
                        <h2><strong>Fullname: </strong> {lastname}, {name}</h2>
                        <p><strong>Status: </strong>{status}</p>
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
            )}

           {addForm ?
           
           (
              <div className="max-w-md mx-auto bg-blue-500 p-5 mt-5 rounded-none lg:rounded shadow-lg">
                <button onClick={newForm} type="button" className="bg-blue-600 hover:bg-blue-800 px-5 py-2 rounded text-white cursor-pointer mr-2 transition duration-300">Add New</button>
              </div>
           )
           
           : (

             <form onSubmit={handleSubmit}  className="max-w-md mx-auto bg-blue-500 p-5 mt-5 rounded shadow-lg">
              <label htmlFor="name" className="text-white w-full">Name: </label>
              <input type="text" name="name" id="name" value={isFormData.name} onChange={handleClhange} className="border-b border-white text-white w-full" />

              <label htmlFor="lastname" className="text-white w-full">Last Name: </label>
              <input type="text" name="lastname" id="lastname" value={isFormData.lastname} onChange={handleClhange} className="border-b border-white text-white w-full" />

            <div className="w-full mt-2"></div>

              <label htmlFor="status" className="text-white w-full">Status: </label>
              <select name="status" id="status" onChange={handleClhange} value={isFormData.status} className="text-white bg-blue-500 ">
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            <div className="w-full mt-2"></div>
              <label htmlFor="status" className="text-white w-full">Message: </label>
              <textarea name="message" id="message" value={isFormData.message} onChange={handleClhange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>

            <div className="w-full mt-5"></div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-800 px-5 py-2 rounded text-white cursor-pointer mr-2 transition duration-300">{isUpdate ? 'Update' : 'Submit'}</button>
            {isUpdate &&
              <button onClick={handleCancel} type="button" className="bg-yellow-600 hover:bg-yellow-800 px-5 py-2 rounded text-white cursor-pointer transition duration-300">Cancel</button>
            }
            </form>

           )}
          
          </>
        );
      }
      
      export default Form;