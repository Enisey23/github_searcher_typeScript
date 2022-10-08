import React from "react";
import { useAppDispatch } from "../hook";
import { useNavigate } from "react-router-dom";
import { fetchProject } from "../redux/slice/project";
import { fetchUser } from "../redux/slice/searchLogin";

const SearchUser: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getLogin = async (login:string) => {
    const userData = await dispatch(fetchUser(login));
    const projectData = await dispatch(fetchProject(login));

    if (!userData.payload) {
      return alert(
        "Не удалось найти пользователя, попробуйте найти другого пользователя"
      );
    }

    if (projectData.payload) {
      return navigate("/user");
    }

    return alert("Не удалось получить проекты пользователя");
  };

  return (
    <div className="parent">
      <h1 className="heading">Поиск пользователя github</h1>
      <input 
        placeholder="Имя пользователя"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button className="button" onClick={() => getLogin(email)}>
        Поиск
      </button>
    </div>
  );
};

export default SearchUser;
