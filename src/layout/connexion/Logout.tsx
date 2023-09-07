import USER_API from "../../utils/api/Users";

function Logout() {
  const logoff = () => {
    USER_API.logout();
  };

  return (
    <button className="header-button" onClick={logoff}>
      Logout
    </button>
  );
}

export default Logout;
