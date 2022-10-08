import React from "react";
import { useAppDispatch, useAppSelector } from '../hook'
import { Navigate, useNavigate } from "react-router-dom";
import { fetchCommit } from "../redux/slice/commit";

// import styles from "./UserProjects.module.scss";


const UserProjects: React.FC = () => {
  const { login, avatar_url }:any = useAppSelector((state) => state.user.data);
  const project = useAppSelector((state) => state.project.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getProjectCommit = (projectName: string) => {
    dispatch(fetchCommit([login, projectName]));
    navigate("/user/commit");
  };

  if (!login) {
    return <Navigate to="/" />;
  }

  return (
    <div className="wrapper">
      <div>
        <img src={avatar_url} alt="Avatar" className="avatar"/>
        <h1>{login}</h1>
      </div>
      <div className="table">
        <table className="w-full">
          <thead>
            <tr>
              <th>Наименование</th>
              <th>Язык программирования</th>
              <th>Описание</th>
              <th>Количество звёзд</th>
            </tr>
            {project.map((project, index: number) => (
              <tr key={index}>
                <td>
                  <button onClick={() => getProjectCommit(project.name)}>
                    {project.name}
                  </button>
                </td>
                <td>{project.language}</td>
                <td>{project.description}</td>
                <td>{project.stargazers_count}</td>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    </div>
  );
};

export default UserProjects;
