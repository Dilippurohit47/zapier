import { useEffect, useState } from "react";

import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
type RepoType = {
  [key: string]: any;
};

const CustomDropdown = ({
  options,
  saveSelectedOption,
}: {
  options: RepoType[];
  saveSelectedOption: (option: RepoType) => void;
}) => {
  const [repos, setRepos] = useState<RepoType[] | null>(null);
  const [selected, setSelected] = useState<RepoType | null>(null);
  const [showRepos, setShowRepos] = useState<boolean>(false);
  const handleSelect = (option: RepoType) => {
    setSelected(option);
    saveSelectedOption(option);
    setsearchRepo("");
  };
  const [searchRepo, setsearchRepo] = useState<string>("");

  useEffect(() => {
    if (searchRepo) {
      const searchResults = options.filter((repo) => {
        return repo.name.toLowerCase().includes(searchRepo.toLowerCase());
      });
      setRepos(searchResults);
    }
    if (!searchRepo) {
      setRepos(options);
    }
  }, [searchRepo, options]);

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
        <>
          <div className="border  border-gray-400 rounded-md flex gap-3 item-center px-2 py-1 ">
            <div className=" flex items-center">
              <CiSearch size={20} />
            </div>
            <input
              placeholder="search repo"
              className=" focus:outline-none  border-0  w-full"
              onChange={(e) => setsearchRepo(e.target.value)}
            />
          </div>
          <ul className="absolute w-full mt-1 bg-white border rounded shadow-lg z-10 overflow-y-auto h-[20rem]">
            {repos
              ? repos.map((repo) => (
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
                ))
              : "no repos"}
          </ul>
        </>
      )}
    </div>
  );
};

type EventType = {
  name: string;
  desc: string;
  event: string;
};
const CustomDropdownForActions = ({
  options,
  saveSelectedOption,
}: {
  options: EventType[];
  saveSelectedOption: (option: any) => void;
}) => {
  const [selected, setSelected] = useState<EventType | null>(null);
  const [showRepos, setShowRepos] = useState<boolean>(false);
  const handleSelect = (option: EventType) => {
    setSelected(option);
    saveSelectedOption(option);
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
  setTriggerMetaData,
}: {
  setOpenTriggerModel: (string: string) => void;
  setTriggerMetaData: (data: any) => void;
}) {
  const [usersRepo, setUsersRepo] = useState<RepoType[]>([]);
  const [selected, setSelected] = useState<RepoType | null>(null);
  const [trigger, setTrigger] = useState<EventType | null>(null);
  const [recentCommits, setRecentCommits] = useState([]);
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

    const fetchRepoCommits = async () => {
      const res = await axios.get(
        `https://api.github.com/repos/${selected?.owner.login}/${selected?.name}/commits`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      setRecentCommits(res.data);
    };

    fetchUserGit();
    if (trigger?.name === "New Commit") {
      fetchRepoCommits();
    }
  }, [selected, trigger]);

  const events: EventType[] = [
    {
      name: "New Branch",
      desc: "Trigger when a new branch is created",
      event: "create", // Corresponds to the "create" event in GitHub
    },
    {
      name: "New Commit",
      desc: "Trigger when a new commit is pushed to a repository",
      event: "push", // Corresponds to the "push" event in GitHub
    },
    {
      name: "New Pull Request",
      desc: "Trigger when a new pull request is created",
      event: "pull_request", // Corresponds to the "pull_request" event in GitHub
    },
    {
      name: "New Issue",
      desc: "Trigger when a new issue is opened",
      event: "issues", // Corresponds to the "issues" event in GitHub
    },
    {
      name: "Issue Comment",
      desc: "Trigger when a comment is added to an issue",
      event: "issue_comment", // Corresponds to the "issue_comment" event in GitHub
    },
    {
      name: "Fork",
      desc: "Trigger when a repository is forked",
      event: "fork", // Corresponds to the "fork" event in GitHub
    },
    {
      name: "Release",
      desc: "Trigger when a new release is published",
      event: "release", // Corresponds to the "release" event in GitHub
    },
  ];

  return (
    <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full  bg-slate-100 bg-opacity-70 flex">
      <div className="relative py-4 px-4 border bg-white  border-[#0000002a] w-full max-w-2xl max-h-full shadow-lg rounded-md">
        <h4 className="font-bold my-2">Github</h4>
        {trigger && selected && (
          <h6 className="">
            Whenever new <span className="font-semibold">{trigger.name}</span>{" "}
            will happen in your{" "}
            <span className="font-semibold">{selected.name}</span> this trigger
            will run
          </h6>
        )}
        <div className="flex flex-col gap-5">
          <div>
            <label
              htmlFor=""
              className="text-sm pb-1 pt-2 font-medium text-gray-600"
            >
              Repo
            </label>
            <CustomDropdown
              options={usersRepo}
              saveSelectedOption={setSelected}
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
              saveSelectedOption={setTrigger}
            />
          </div>

          {trigger &&
            trigger.name === "New Commit" &&
            recentCommits.length > 0 && (
              <div>
                <h1 className="text-sm pb-1 pt-2 font-medium text-gray-600">
                  {" "}
                  Few Recent Commits from
                  <span className="text-black ml-1">{selected?.name}</span>
                </h1>
                {recentCommits?.slice(0, 4).map((commit: any, index) => (
                  <div className="flex justify-between items-center text-[1rem]">
                    <span className="font-semibold  text-gray-700 ">
                      {commit.commit.message}
                    </span>{" "}
                    <div>
                      <span className="text-gray-400">
                        {commit.commit.author.date.split("T")[0]}
                      </span>
                      <span className="text-gray-400">
                        / {commit.commit.author.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          <div className="pt-2">
            <button
              className=" w-full  py-3    cursor-pointer hover:shadow-md bg-[#0D1117] font-semibold text-white rounded-full text-center flex justify-center items-center"
              onClick={() => {
                setTriggerMetaData({ repo: selected, eventName: trigger }),
                  setOpenTriggerModel("");
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
