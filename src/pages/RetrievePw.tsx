import LoginForm from "../components/LoginForm";

function RetrievePw() {
  return (
    <LoginForm
      method="PUT"
      title="j'ai pas la moindre idée de comment on fait cette feature"
      url="/users/retrievepw"
      email={true}
      location="retrievePw"
    />
  );
}

export default RetrievePw;
