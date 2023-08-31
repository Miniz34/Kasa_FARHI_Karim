import React, { useState } from "react";

interface FormDataDeux {
  title: string;
  description: string;
  location: string;
  pictures: string[];
  equipments: string[];
  userId: string;
}

const NewHouse: React.FC = () => {
  const id = localStorage.getItem("id");
  console.log(id);

  const [formDataDeux, setFormDataDeux] = useState<FormDataDeux>({
    title: "",
    description: "",
    location: "",
    pictures: [], // Initialize the pictures array
    equipments: [], // Initialize the equipments array
    userId: id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormDataDeux((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEquipmentChange = (index: number, value: string) => {
    const updatedEquipments = [...formDataDeux.equipments];
    updatedEquipments[index] = value;
    setFormDataDeux((prevData) => ({
      ...prevData,
      equipments: updatedEquipments,
    }));
  };

  const addEquipment = () => {
    setFormDataDeux((prevData) => ({
      ...prevData,
      equipments: [...prevData.equipments, ""],
    }));
  };

  const removeEquipment = (index: number) => {
    const updatedEquipments = formDataDeux.equipments.filter(
      (_, i) => i !== index
    );
    setFormDataDeux((prevData) => ({
      ...prevData,
      equipments: updatedEquipments,
    }));
  };

  const handlePictureChange = (index: number, value: string) => {
    const updatedPictures = [...formDataDeux.pictures];
    updatedPictures[index] = value;
    setFormDataDeux((prevData) => ({
      ...prevData,
      pictures: updatedPictures,
    }));
  };

  const addPicture = () => {
    setFormDataDeux((prevData) => ({
      ...prevData,
      pictures: [...prevData.pictures, ""],
    }));
  };

  const removePicture = (index: number) => {
    const updatedPictures = formDataDeux.pictures.filter((_, i) => i !== index);
    setFormDataDeux((prevData) => ({
      ...prevData,
      pictures: updatedPictures,
    }));
  };

  //TODO : add user id
  const handleSubmitDeux = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL_DEV + "/house/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataDeux),
        }
      );

      if (response.ok) {
        console.log("Form data submitted successfully");
        // You can reset the form or perform any other actions here
      } else {
        console.error("Failed to submit form data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <h1>HOUSE DATA HELLO</h1>
      <form onSubmit={handleSubmitDeux}>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formDataDeux.title}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="description">description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formDataDeux.description}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="location">location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formDataDeux.location}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        {/* Equipments */}
        <label htmlFor="equipments">Equipments:</label>
        {formDataDeux.equipments.map((equipment, index) => (
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

        <br />
        <br />

        <label htmlFor="pictures">Pictures:</label>
        {formDataDeux.pictures.map((picture, index) => (
          <div key={index}>
            <input
              type="text"
              value={picture}
              onChange={(e) => handlePictureChange(index, e.target.value)}
            />
            <button type="button" onClick={() => removePicture(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addPicture}>
          Add Picture
        </button>

        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewHouse;
