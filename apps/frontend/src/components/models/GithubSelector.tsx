import { useEffect, useState } from "react";
import { Input } from "../Input";

import axios from "axios";
import { useSelector } from "react-redux";
type RepoType = {
  [key: string]: any;
};

const CustomDropdown = ({ options }: { options: RepoType[] }) => {
  const [selected, setSelected] = useState<RepoType | null>(null);
  const [showRepos, setShowRepos] = useState<boolean>(false);
  const handleSelect = (option: RepoType) => {
    setSelected(option);
  };
  console.log(showRepos);
  return (
    <div className="relative w-full">
      {/* Selected value */}
      <div
        className="w-full py-2 px-3 border rounded cursor-pointer flex justify-between items-center"
        onClick={() => setShowRepos(!showRepos)}
      >
        {selected ? (
          <div>
            <span className="font-semibold">{selected.name}</span>{" "}
            <span className="text-gray-400">/ {selected.owner.login}</span>
          </div>
        ) : (
          "Select a repository"
        )}
        <span className="text-gray-500">&#x25BC;</span>
      </div>

      {/* Dropdown menu */}
      {showRepos && (
        <ul className="absolute w-full mt-1 bg-white border rounded shadow-lg z-10 overflow-y-auto h-[20rem]">
          {options.map((repo) => (
            <li
              key={repo.id}
              className="py-2 px-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              onClick={() => handleSelect(repo)}
            >
              <span className="font-semibold">{repo.name}</span>{" "}
              <span className="text-gray-400">/ {repo.owner.login}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export function GithubSelector({
  setOpenTriggerModel,
}: {
  setOpenTriggerModel: (string: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const [usersRepo, setUsersRepo] = useState<RepoType[]>([]);
  const token = useSelector((state: any) => state.userReducer.user.githubToken);
  console.log("github token", token);
  useEffect(() => {
    const fetchUserGit = async () => {
      const res = await axios.get("https://api.github.com/user/repos", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });
      if (res.status === 200) {
        setUsersRepo(res.data);
      }
    };

    fetchUserGit();
  }, []);
  console.log(usersRepo);
  const submitForm = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    setOpenTriggerModel(""); //close modal after form submit
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full  bg-slate-100 bg-opacity-70 flex">
      <div className="relative py-4 px-4 border bg-white  border-[#0000002a] w-full max-w-2xl max-h-full shadow-lg rounded-md">
        <h4 className="font-bold my-2">Github</h4>
        <form onSubmit={submitForm}>
          <label
            htmlFor=""
            className="text-sm pb-1 pt-2 font-medium text-gray-600"
          >
            Repo
          </label>
          <CustomDropdown options={usersRepo} />
          <Input
            label="Body"
            name="body"
            value={body}
            type={"text"}
            placeholder="Body"
            onChange={(e) => setBody(e.target.value)}
            className={"!border border-gray-200 focus:outline-none "}
          ></Input>
          <div className="pt-2">
            <button className=" w-full  py-3    cursor-pointer hover:shadow-md bg-[#0D1117] font-semibold text-white rounded-full text-center flex justify-center items-center">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
