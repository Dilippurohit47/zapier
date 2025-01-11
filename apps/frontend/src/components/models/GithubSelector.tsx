import { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
type RepoType = {
  [key: string]: any;
};

const CustomDropdown = ({
  options,
  saveSelectedOtion,
}: {
  options: RepoType[];
  saveSelectedOtion: (option: RepoType) => void;
}) => {
  const [selected, setSelected] = useState<RepoType | null>(null);
  const [showRepos, setShowRepos] = useState<boolean>(false);
  const handleSelect = (option: RepoType) => {
    setSelected(option);
    saveSelectedOtion(option);
  };

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
              onClick={() => {
                handleSelect(repo), setShowRepos(false);
              }}
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

type EventType = {
  name: string;
  desc: string;
};
const CustomDropdownForActions = ({
  options,
  saveSelectedOtion,
}: {
  options: EventType[];
  saveSelectedOtion: (option: any) => void;
}) => {
  const [selected, setSelected] = useState<EventType | null>(null);
  const [showRepos, setShowRepos] = useState<boolean>(false);
  const handleSelect = (option: EventType) => {
    setSelected(option);
    saveSelectedOtion(option);
  };

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
            {/* <span className="text-gray-400">/ {selected.owner.login}</span> */}
          </div>
        ) : (
          "Select event  "
        )}
        <span className="text-gray-500">&#x25BC;</span>
      </div>

      {/* Dropdown menu */}
      {showRepos && (
        <ul className="absolute w-full mt-1 bg-white border rounded shadow-lg z-10 overflow-y-auto ">
          {options?.map((trigger: any, index: number) => (
            <li
              key={index}
              className="py-2 px-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              onClick={() => {
                handleSelect(trigger), setShowRepos(false);
              }}
            >
              <span className="font-semibold">{trigger.name}</span>{" "}
              <span className="font-normal text-gray-400 ">{trigger.desc}</span>{" "}
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
  const [body, setBody] = useState("");
  const [usersRepo, setUsersRepo] = useState<RepoType[]>([]);
  const [selected, setSelected] = useState<RepoType | null>(null);

  const [githubActions, setGithubActions] = useState([]);
  const token = useSelector((state: any) => state.userReducer.user.githubToken);
  useEffect(() => {
    const fetchUserGit = async () => {
      const res = await axios.get(
        "https://api.github.com/user/repos?per_page=100",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      if (res.status === 200) {
        setUsersRepo(res.data);
      }
    };

    const fetchGitActions = async () => {
      const res = await axios.get(
        `https://api.github.com/repos/${selected?.owner.login}/${selected?.name}/hooks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      setGithubActions(res.data);
    };

    fetchUserGit();
    // fetchGitActions();
  }, [selected]);

  const events: EventType[] = [
    { name: "New Branch", desc: "Trigger when a new branch is created" },
    { name: "New commit", desc: "Trigger when a new commit is created" },
    {
      name: "New Commit",
      desc: "Trigger when a new commit is pushed to a repository",
    },
    {
      name: "New Pull Request",
      desc: "Trigger when a new pull request is created",
    },
    { name: "New Issue", desc: "Trigger when a new issue is opened" },
    {
      name: "Issue Comment",
      desc: "Trigger when a comment is added to an issue",
    },
    { name: "Fork", desc: "Trigger when a repository is forked" },
    { name: "Release", desc: "Trigger when a new release is published" },
  ];

  return (
    <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full  bg-slate-100 bg-opacity-70 flex">
      <div className="relative py-4 px-4 border bg-white  border-[#0000002a] w-full max-w-2xl max-h-full shadow-lg rounded-md">
        <h4 className="font-bold my-2">Github</h4>
        <form className="flex flex-col gap-5">
          <div>
            <label
              htmlFor=""
              className="text-sm pb-1 pt-2 font-medium text-gray-600"
            >
              Repo
            </label>
            <CustomDropdown
              options={usersRepo}
              saveSelectedOtion={setSelected}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="text-sm pb-1 pt-2 font-medium text-gray-600"
            >
              Trigger event
            </label>
            <CustomDropdownForActions
              options={events}
              saveSelectedOtion={setSelected}
            />
          </div>

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
