import React, { useState, useRef } from "react";
import HOUSE_API from "../../utils/api/House";

interface FormData {
  title: string;
  description: string;
  location: string;
  pictures: File[];
  equipments: string[];
  pictureInputs: JSX.Element[];
  userId: number;
  houseId: number;
}

const initialFormData: FormData = {
  title: "",
  description: "",
  location: "",
  pictures: [],
  equipments: [],
  pictureInputs: [],
  userId: 0,
  houseId: 0,
};

const NewHouse: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const refEquipments = useRef<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
    if (files) {
      setFormData({
        ...formData,
        pictures: [...formData.pictures, ...Array.from(files)],
      });
    }
  };

  const handleEquipmentChange = (index: number, value: string) => {
    const updatedEquipments = [...formData.equipments];
    updatedEquipments[index] = value;
    setFormData({
      ...formData,
      equipments: updatedEquipments,
    });
  };

  const removeEquipment = (index: number) => {
    const updatedEquipments = [...formData.equipments];
    updatedEquipments.splice(index, 1);
    setFormData({
      ...formData,
      equipments: updatedEquipments,
    });
    // Remove the corresponding ref
    refEquipments.current.splice(index, 1);
  };

  const addEquipment = () => {
    setFormData({
      ...formData,
      equipments: [...formData.equipments, ""],
    });
    // Add an empty string to the ref array
    refEquipments.current.push("");
  };

  const addPictureInput = () => {
    const newIndex = formData.pictureInputs.length;
    const newInput = (
      <div key={newIndex}>
        <input
          type="file"
          name={`pictureInput-${newIndex}`}
          accept="image/*"
          onChange={(e) => handleFileInputChange(e)}
        />
      </div>
    );

    setFormData({
      ...formData,
      pictureInputs: [...formData.pictureInputs, newInput],
    });
  };

  const removePictureInput = () => {
    const updatedInputs = [...formData.pictureInputs];
    updatedInputs.pop();
    setFormData({
      ...formData,
      pictureInputs: updatedInputs,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await HOUSE_API.createHouse({ formData: formData });
      if (response) {
        console.log("SEE RESPONSE BELOW");
        console.log(response);
      } else {
        console.log("NO RESPONSE FOR SOME REASON, DEBUG BELOW");
        console.log(response);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="inputFile">Pictures:</label>
        <input
          type="file"
          name="inputFile"
          accept="image/*"
          id="inputFile"
          multiple
          onChange={handleFileInputChange}
        />
      </div>
      <div>
        <label htmlFor="equipments">Equipments:</label>
        {formData.equipments.map((equipment, index) => (
          <div key={index}>
            <input
              type="text"
              value={equipment}
              onChange={(e) => handleEquipmentChange(index, e.target.value)}
            />
            <button type="button" onClick={() => removeEquipment(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addEquipment}>
          Add Equipment
        </button>
      </div>
      <div>
        <label htmlFor="additionalPictures">Additional Pictures:</label>
        {formData.pictureInputs.map((inputElement, index) => (
          <div key={index}>{inputElement}</div>
        ))}
        <button type="button" onClick={addPictureInput}>
          Add Picture
        </button>
        <button type="button" onClick={removePictureInput}>
          Remove Last Picture
        </button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewHouse;
