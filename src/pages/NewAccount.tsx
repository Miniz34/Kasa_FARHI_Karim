import LoginForm from "../components/LoginForm";
import Register from "../layout/connexion/Register";

function NewAccount() {
  return <Register />;
  // return (
  //   <LoginForm
  //     title="Create your account"
  //     url="/users/new"
  //     method="POST"
  //     // link1="allo"
  //     // link2="bleh"
  //     text1="ezae "
  //     text2="hello"
  //     username={true}
  //     password={true}
  //     email={true}
  //     firstName={true}
  //     lastName={true}
  //     location="newAccount"
  //   />
  // );
}

export default NewAccount;
