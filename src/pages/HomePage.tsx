import React, { useEffect, useState } from "react";
import {
	useLazyGetUserReposQuery,
	useSearchUsersQuery,
} from "../store/github/github.api";
import { log } from "console";
import { useDebounce } from "../hooks/debounce";
import { click } from "@testing-library/user-event/dist/click";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
	const [search, setSearch] = useState("");
	const debunked = useDebounce(search);
	const [dropdown, setDropdown] = useState(false);

	const { isLoading, isError, data } = useSearchUsersQuery(debunked, {
		skip: debunked.length < 3,
	});

	const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
		useLazyGetUserReposQuery();

	useEffect(() => {
		setDropdown(debunked.length > 3 && data?.length! > 0);

		console.log(search);
	}, [debunked, data]);

	const clickHandler = (username: string) => {
		fetchRepos(username);
		setDropdown(false);
	};

	return (
		<div className="flex justify-center pt-10 max-auto h-screen ">
			{isError && (
				<p className="text-center text-red-600">Something went wrong...</p>
			)}

			<div className="relative w-[560px]">
				<input
					type="text"
					className="border py-2 px-4 w-full h-[42px] mb-2"
					placeholder="Search"
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>

				{dropdown && (
					<ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
						{isLoading && <p className="text-center">loading...</p>}
						{data?.map(user => (
							<li
								onClick={() => clickHandler(user.login)}
								className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
								key={user.id}>
								{user.login}
							</li>
						))}
					</ul>
				)}
				<div className="">
					{areReposLoading && <p className="text-center">Repos loading...</p>}
					{repos?.map(repo => (
						<RepoCard repo={repo} key={repo.id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
