// import React, { useState } from "react";
// import { redirect, useNavigate } from "react-router-dom";
// import "./LoginForm.css";
// import { NavLink } from "react-router-dom";

// import colors from "../utils/styles/colors";

// import { useContext } from "react";

// import { DisplayModalProps, ModalContext } from "modal-kf-react/ModalProvider";

// import { Validations } from "../utils/validation/validation";

// interface FormData {
//   firstName?: string;
//   lastName?: string;
//   username?: string;
//   email?: string;
//   password?: string;
//   repeatPassword?: string;
// }

// interface LoginProps {
//   firstName?: boolean;
//   lastName?: boolean;
//   email?: boolean;
//   title: string;
//   url: string;
//   method: string;
//   location: string;
//   username?: boolean;
//   password?: boolean;
//   repeatPassword?: boolean;
//   urlId?: string;
//   link1?: string;
//   link2?: string;
//   text1?: string;
//   text2?: string;
// }

// const LoginForm: React.FC<LoginProps> = ({
//   firstName,
//   lastName,
//   email,
//   title,
//   url,
//   method,
//   location,
//   username,
//   password,
//   repeatPassword,
//   urlId,
//   link1,
//   link2,
//   text1,
//   text2,
// }: LoginProps) => {
//   const [formData, setFormData] = useState<FormData>({
//     ...(email && email == true && { email: "" }),
//     ...(password && password == true && { password: "" }),
//     ...(username && username == true && { username: "" }),
//     ...(repeatPassword && repeatPassword == true && { repeatPassword: "" }),
//     ...(urlId && { urlId: urlId }),
//   });

//   console.log(formData);
//   const { open } = useContext(ModalContext);

//   const { DisplayModal } = useContext(ModalContext);

//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const validateForm = (email: string, password: string) => {
//     const isEmailValid = Validations.EmailValidation.test(email);
//     console.log(email);
//     const isPasswordValid = Validations.PasswordValidation.test(password);
//     if (isEmailValid && isPasswordValid) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   console.log(location);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const isFormValid = validateForm(formData.email, formData.password);

//     // if (isFormValid) {
//     try {
//       const response = await fetch(process.env.REACT_APP_API_URL_DEV + url, {
//         method: method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       console.log(response.status);
//       console.log(validateForm(formData.email, formData.password));

//       if (response.ok) {
//         const responseData = await response.json();
//         const id = responseData.id;
//         console.log(id);
//         console.log(responseData);

//         if (location === "login" || location === "newAccount") {
//           console.log("Form data submitted successfully");

//           localStorage.setItem("token", responseData.newToken);

//           //TODO marche une fois sur 2
//           localStorage.setItem("id", id);
//           navigate("/");
//           window.location.reload();
//         } else if (location === "retrievePw") {
//           DisplayModal({
//             mode: "info",
//             title: "Succès",
//             children: "Un email a été envoyé",
//             backgroundColor: "blue",
//             textColor: "white",
//             borderRadius: "0",
//           } as DisplayModalProps);
//         } else if (location === "resetPw") {
//           DisplayModal({
//             mode: "info",
//             title: "Succès",
//             children: "Le mot de passe a été modifié",
//             backgroundColor: "blue",
//             textColor: "white",
//             borderRadius: "0",
//             onClosed: () => navigate("/"),
//           } as DisplayModalProps);
//         }
//       } else {
//         console.error("Failed to submit form data");
//         DisplayModal({
//           mode: "error",
//           title: "Error",
//           children: "User or password incorrect",
//           backgroundColor: `${colors.primary}`,
//           textColor: "white",
//           borderRadius: "0",
//         });
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }

//     //TODO error 500 (wrong email format) + probably wrong password format
//     // }
//     // else {
//     //   DisplayModal({
//     //     mode: "error",
//     //     title: "Error",
//     //     children: "please fill all the fields",
//     //     backgroundColor: `${colors.primary}`,
//     //     textColor: "white",
//     //     borderRadius: "0",
//     //   });
//     // }
//   };

//   return (
//     <form
//       className={open ? "login-form-hide" + " " + "login-form" : "login-form"}
//     >
//       <h2 className="login-title">{title}</h2>

//       {firstName ? (
//         <>
//           <label htmlFor="firstName" className="login-label">
//             firstName
//           </label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             className="login-input"
//           />
//         </>
//       ) : null}

//       {lastName ? (
//         <>
//           <label htmlFor="lastName" className="login-label">
//             lastName
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             className="login-input"
//           />
//         </>
//       ) : null}

//       {email ? (
//         <>
//           <label htmlFor="email" className="login-label">
//             Email
//           </label>
//           <input
//             type="text"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="login-input"
//           />
//         </>
//       ) : null}
//       {password ? (
//         <>
//           <label htmlFor="password" className="login-label">
//             Password
//           </label>
//           <input
//             type="text"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="login-input"
//           />
//         </>
//       ) : null}

//       {repeatPassword ? (
//         <>
//           <label htmlFor="repeatPassword" className="login-label">
//             Répéter le mot de passe
//           </label>
//           <input
//             type="text"
//             id="repeatPassword"
//             name="repeatPassword"
//             value={formData.repeatPassword}
//             onChange={handleChange}
//             className="login-input"
//           />
//         </>
//       ) : null}

//       {username ? (
//         <>
//           <label htmlFor="username" className="login-label">
//             username
//           </label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             className="login-input"
//           />
//         </>
//       ) : null}

//       <div className="login-redirect">
//         {link1 ? <NavLink to={link1}>{text1}</NavLink> : null}
//         {link2 ? <NavLink to={link2}>{text2}</NavLink> : null}
//       </div>
//       <button type="submit" onClick={handleSubmit} className="login-submit">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default LoginForm;
