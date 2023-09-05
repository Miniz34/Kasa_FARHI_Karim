import USER_API from "../../utils/api/Users";

//TODO : ne fonctionne pas , use cookie est un contexte donc ça fout le bordel
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
