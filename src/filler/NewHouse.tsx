import React, { useState, createRef } from "react";
import { useCookies } from "react-cookie";
import HOUSE_API from "../utils/api/House";

interface FormDataDeux {
  title: string;
  description: string;
  location: string;
  pictures: File[];
  equipments: string[];
  userId: string;
}

const NewHouse: React.FC = () => {
  const [cookies] = useCookies(["userId"]);

  const id = cookies.userId;
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

  const [errorAvatar, setErrorAvatar] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  //NEWMULTER

  ///UPLOAD IMAGES///
  const refAvatar = createRef<HTMLInputElement>();
  const refAvatarUrl = createRef<HTMLInputElement>();

  const refTitle = createRef<HTMLInputElement>();

  const refDescription = createRef<HTMLInputElement>();

  const refEquipments = createRef<HTMLInputElement>();
  const refLocation = createRef<HTMLInputElement>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorAvatar(false);
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      // Update the pictures array with the selected file
      setFormDataDeux((prevData) => ({
        ...prevData,
        pictures: [...prevData.pictures, file],
      }));

      // Optionally, you can preview the selected file
      const reader = new FileReader();
      reader.onload = (event) => {
        setFilePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  ///FIN UPLOAD IMAGE///

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

  // const handlePictureChange = (index: number, value: string) => {
  //   const updatedPictures = [...formDataDeux.pictures];
  //   updatedPictures[index] = value;
  //   setFormDataDeux((prevData) => ({
  //     ...prevData,
  //     pictures: updatedPictures,
  //   }));
  // };

  // const addPicture = () => {
  //   setFormDataDeux((prevData) => ({
  //     ...prevData,
  //     pictures: [...prevData.pictures, ""],
  //   }));
  // };

  const removePicture = (index: number) => {
    const updatedPictures = formDataDeux.pictures.filter((_, i) => i !== index);
    setFormDataDeux((prevData) => ({
      ...prevData,
      pictures: updatedPictures,
    }));
  };

  //TODO : add user id
  // const handleSubmitDeux = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(
  //       process.env.REACT_APP_API_URL_DEV + "/house/new",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formDataDeux),
  //       }
  //     );

  //     if (response.ok) {
  //       console.log("Form data submitted successfully");
  //       // You can reset the form or perform any other actions here
  //     } else {
  //       console.error("Failed to submit form data");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

  // const handleSubmitWithFile = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const response = await HOUSE_API.createHouse({
  //     title: formDataDeux.title,
  //     description: formDataDeux.description,
  //     location: formDataDeux.location,
  //     equipments: formDataDeux.equipments,
  //     pictures: formDataDeux.pictures,
  //     userId: formDataDeux.userId,
  //   });
  //   if (response) {
  //     console.log("SEE RESPONSE BELOW");
  //     console.log(response);
  //   } else {
  //     console.log("NO RESPONSE FOR SOME REASON, DEBUG BELOW");
  //     console.log(response);
  //   }
  // };

  const handleSubmitWithFile = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("title", formDataDeux.title);
    formData.append("description", formDataDeux.description);
    formData.append("location", formDataDeux.location);

    formDataDeux.pictures.forEach((picture, index) => {
      formData.append(`picture${index}`, picture);
    });

    formData.append("equipments", JSON.stringify(formDataDeux.equipments));
    formData.append("userId", formDataDeux.userId);

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
    <div>
      <h1>HOUSE DATA HELLO</h1>
      {/* <form onSubmit={handleSubmitDeux}> */}
      <form onSubmit={handleSubmitWithFile} encType="multipart/form-data">
        <label htmlFor="title">title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formDataDeux.title}
          onChange={handleChange}
          required
          ref={refTitle}
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
          ref={refDescription}
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
          ref={refLocation}
        />
        <br />
        <br />
        {/* Equipments */}
        <label htmlFor="equipments">Equipments:</label>
        {formDataDeux.equipments.map((equipment, index) => (
          <div key={index}>
            <input
              ref={refEquipments}
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
        {/* 
        <label htmlFor="pictures">Pictures:</label>
        {formDataDeux.pictures.map((picture, index) => (
          <div key={index}>
            <input
              ref={refAvatarUrl}
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
        <br /> */}

        {/* <label htmlFor="pictures">Pictures file:</label>
        {formDataDeux.pictures.map((picture, index) => (
          <div key={index}>
            <input
              ref={refAvatar}
              type="file"
              name="inputFile"
              onChange={(e) => handleFileChange}
            />
            <button type="button" onClick={() => removePicture(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleFileChange}>
          Add Picture
        </button> */}

        <label htmlFor="pictures">Pictures:</label>
        <input
          type="file"
          id="pictures"
          name="pictures"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />

        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewHouse;
