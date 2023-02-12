import { IRepo } from "../models/models";

export function RepoCardComponent({ repo }: { repo: IRepo }) {
  return (
    <div key={repo.id}>
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        {repo.name}
      </a>
    </div>
  );
}
