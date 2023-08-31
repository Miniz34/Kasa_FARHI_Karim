import LoginForm from "../components/LoginForm";
import { useParams } from "react-router-dom";

function ResetPw() {
  // const params = new URLSearchParams(document.location.search);
  // console.log(params);
  // console.log(name);

  // const id = useParams();
  // console.log(id);

  const currentLocation = window.location.href;
  const urlParts = currentLocation.split("/");
  const id = urlParts[urlParts.length - 1];
  console.log(urlParts);
  console.log(id);

  return (
    <LoginForm
      method="POST"
      title="Récupération de mot passe"
      url="/users/resetpw"
      password={true}
      repeatPassword={true}
      urlId={id}
      location="resetPw"
    />
  );
}

export default ResetPw;
