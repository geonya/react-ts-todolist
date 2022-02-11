import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ id, text, category }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const handleCategory = (category: Categories) => {
		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
			const newToDo = { id, text, category };
			return [
				...oldToDos.slice(0, targetIndex),
				newToDo,
				...oldToDos.slice(targetIndex + 1),
			];
		});
	};
	const handleDelete = () => {
		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
			const newToDo = oldToDos.filter(
				(toDo) => toDo !== oldToDos[targetIndex]
			);
			return newToDo;
		});
	};
	return (
		<li key={id}>
			{text}
			{category !== Categories.TO_DO && (
				<button onClick={() => handleCategory(Categories.TO_DO)}>
					To Do
				</button>
			)}
			{category !== Categories.DOING && (
				<button onClick={() => handleCategory(Categories.DOING)}>
					Doing
				</button>
			)}

			{category !== Categories.DONE && (
				<button onClick={() => handleCategory(Categories.DONE)}>
					Done
				</button>
			)}
			<button onClick={handleDelete}>X</button>
		</li>
	);
}

export default ToDo;
