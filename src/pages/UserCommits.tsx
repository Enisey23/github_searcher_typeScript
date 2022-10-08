import React from "react";
import { useAppSelector } from "../hook";
import { useNavigate } from "react-router-dom";

const UserCommits: React.FC = () => {
  const project = useAppSelector((state) => state.commit.data);
  const navigate = useNavigate();

  const returnBack = () => {
    navigate("/user");
  };

  return (
    <div className="wrapper">
      <div className="table">
        <table className="w-full">
          <thead>
            <tr>
              <th>Автор</th>
              <th>хеш коммита</th>
              <th>Дата год.месяц.день</th>
            </tr>
            {project &&
              project.map((project, index: number) => (
                <tr key={index}>
                  <td>{project.commit.author.name}</td>
                  <td>{project.sha}</td>
                  <td>{project.commit.author.date.substr(0, 10)}</td>
                  {/* формат MM/DD/YYYY {new Date(project.commit.author.date).toLocaleDateString()} */}
                </tr>
              ))}
          </thead>
        </table>
      </div>
      <button className="button" onClick={() => returnBack()}>
        Назад
      </button>
    </div>
  );
};

export default UserCommits;
