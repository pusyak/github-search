import {
  useGetUserQuery,
  useLazyGetUserRepositoriesQuery,
} from "../store/github/github.api";
import { SyntheticEvent, useEffect, useState } from "react";
import { useDebounce } from "../hooks/debounce";
import { RepoCardComponent } from "../components/RepoCardComponent";

export function HomePage() {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useGetUserQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserRepositoriesQuery();

  useEffect(() => {
    console.log(debounced);
  }, [debounced]);

  function handleClick(username: string) {
    fetchRepos(username);
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error :(</p>}
      {data?.map((user) => (
        <li onClick={() => handleClick(user.login)} key={user.id}>
          {user.login}
        </li>
      ))}

      <input
        type="text"
        className="border py-2 px-4 w-full h-[42px] mb-2"
        placeholder="Search for Github username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="container">
        {areReposLoading && <p>Loading...</p>}
        {repos?.map((repo) => (
          <RepoCardComponent repo={repo} key={repo.id} />
        ))}
      </div>
    </div>
  );
}
