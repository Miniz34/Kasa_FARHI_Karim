import React, { useState, useEffect } from "react";

interface FormData {
  username: string;
  email: string;
  age: number;
  password: string;
}

interface FormDataDeux {
  title: string;
  description: string;
  picture: string;
}
const CreateUser: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    age: 18,
    password: "",
  });

  const [formDataDeux, setFormDataDeux] = useState<FormDataDeux>({
    title: "",
    description: "",
    picture: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormDataDeux((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL_DEV + "/users/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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

  const [formDataList, setFormDataList] = useState<FormData[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "/users");
      const data = await response.json();

      console.log("Response from API:", data); // Logging the response data
      setFormDataList(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Submit Your Information</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <label htmlFor="password">password:</label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>

      <button onClick={fetchData}>Fetch</button>

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

          <label htmlFor="picture">picture:</label>
          <input
            type="text"
            id="picture"
            name="picture"
            value={formDataDeux.picture}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          {/* <label htmlFor="title">title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formDataDeux.title}
            onChange={handleChange}
            required
          />
          <br />
          <br /> */}

          <button type="submit" onClick={handleSubmitDeux}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
