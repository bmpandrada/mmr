import { useEffect } from "react";
import { useState } from "react";
import Label from "./Label";
import Input from "./Input";
import Select from "./Select";
import TextArea from "./TextArea";
import Output from "./Ouput";
import Button from "./Button";

const Form = () => {
  const [isFormData, setFormData] = useState({
    name: "",
    lastname: "",
    priority: "low",
    message: "",
  });

  const [isData, setData] = useState([]);
  const [isUpdate, setUpdate] = useState(null);
  const [addForm, setAddForm] = useState(true);

  useEffect(() => {
    const dataInserted = JSON.parse(localStorage.getItem("data-form") || "[]");
    if (dataInserted.length > 0) {
      setData(dataInserted);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data-form", JSON.stringify(isData));
  }, [isData]);

  const handleChange = (e) => {
    setFormData({
      ...isFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormData.name || !isFormData.lastname) return;

    if (isUpdate !== null) {
      const updateData = isData.map((dataItem) =>
        dataItem.id === isUpdate.id
          ? { ...dataItem, ...isFormData, updatedAt: new Date().toISOString() }
          : dataItem
      );

      const confirmUpdate = window.confirm("confirm update?");
      if (confirmUpdate) {
        setData(updateData);
        setUpdate(null);
      }
    } else {
      const newData = {
        id: Date.now(),
        ...isFormData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setData([newData, ...isData]);
    }
    setFormData({
      name: "",
      lastname: "",
      priority: "low",
      message: "",
    });
    setAddForm(true);
  };

  const handleDelete = (id) => {
    const deleteData = isData.filter((data) => data.id !== id);
    if (isData.length > 0) {
      const confirmUpdate = window.confirm("confirm delete?");
      if (confirmUpdate) {
        setData(deleteData);
      }
    }
  };

  const handleUpdate = (id) => {
    const forUpdate = isData.find((dataUpdate) => dataUpdate.id === id);
    setFormData({
      name: forUpdate.name,
      lastname: forUpdate.lastname,
      status: forUpdate.status,
      message: forUpdate.message,
    });

    setUpdate(forUpdate);
    setAddForm(false);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      lastname: "",
      priority: "low",
      message: "",
    });
    setUpdate(null);
    setAddForm(true);
  };

  const newForm = () => {
    setAddForm(false);
  };

  const resetData = () => {
    const resetConfirm = window.confirm("Confirm to reset?");
    if (isData.length > 0) {
      if (resetConfirm) {
        setData([]);
      }
    }
  };

  return (
    <>
      {isData.length > 0 && (
        <Output
          data={isData}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      )}

      {addForm ? (
        <div className="max-w-md mx-auto bg-blue-500 p-5 mt-5 rounded-none lg:rounded shadow-lg">
          <Button
            onClick={newForm}
            type={"button"}
            className={
              "bg-blue-600 hover:bg-blue-800 px-5 py-2 rounded text-white cursor-pointer mr-2 transition duration-300"
            }
            title={"Add New"}
          />
          {isData.length > 0 && (
            <Button
              onClick={resetData}
              type={"button"}
              className={
                "bg-yellow-600 hover:bg-yellow-800 px-5 py-2 rounded text-white cursor-pointer mr-2 transition duration-300"
              }
              title={"Reset"}
            />
          )}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-blue-500 p-5 mt-5 rounded shadow-lg"
        >
          <Label name={"name"} title={"Name"} />
          <Input
            name={"name"}
            value={isFormData.name}
            onChange={handleChange}
            type={"text"}
          />

          <Label name={"lastname"} title={"LastName"} />
          <Input
            name={"lastname"}
            value={isFormData.lastname}
            onChange={handleChange}
            type={"text"}
          />
          <div className="w-full mt-2"></div>

          <Label name={"priority"} title={"Priority"} />
          <Select
            name={"priority"}
            value={isFormData.priority}
            onChange={handleChange}
            option={[
              { value: "high", title: "High" },
              { value: "medium", title: "Medium" },
              { value: "low", title: "Low" },
            ]}
          />
          <div className="w-full mt-2"></div>
          <Label name={"message"} title={"Messages"} />
          <TextArea
            name={"message"}
            value={isFormData.message}
            onChange={handleChange}
          />

          <div className="w-full mt-5"></div>
          <Button
            onClick={handleSubmit}
            type={"submit"}
            className={
              "bg-blue-600 hover:bg-blue-800 px-5 py-2 rounded text-white cursor-pointer mr-2 transition duration-300"
            }
            title={isUpdate ? "Update" : "Submit"}
          />
          {isUpdate && (
            <Button
              onClick={handleCancel}
              type={"button"}
              className={
                "bg-yellow-600 hover:bg-yellow-800 px-5 py-2 rounded text-white cursor-pointer transition duration-300"
              }
              title={"Cancel"}
            />
          )}
        </form>
      )}
    </>
  );
};

export default Form;
