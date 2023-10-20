import { useAppSelector } from "../hooks/redux";

const FavoritePage = () => {
	const { favorite } = useAppSelector(state => state.github);

	if (favorite.length === 0) {
		return <p className="text-center">No items.</p>;
	}

	return (
		<div className="flex justify-center pt-10 max-auto h-screen ">
			<ul className="list-none">
				{favorite.map(f => (
					<li key={f}>
						<a href={f} target="_blank">
							{f}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FavoritePage;
