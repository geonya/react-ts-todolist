import { atom, selector } from "recoil";

export interface IToDo {
	id: number;
	text: string;
	category: Categories;
}

export enum Categories {
	"TO_DO" = "TO_DO",
	"DOING" = "DOING",
	"DONE" = "DONE",
}

const localStorageEffect =
	(key: string) =>
	({ setSelf, onSet }: any) => {
		const savedToDos = localStorage.getItem(key);
		if (savedToDos != null) {
			setSelf(JSON.parse(savedToDos));
		}
		onSet((newToDos: [], _: any, isReset: boolean) => {
			isReset
				? localStorage.removeItem(key)
				: localStorage.setItem(key, JSON.stringify(newToDos));
		});
	};

export const toDoState = atom<IToDo[]>({
	key: "toDo",
	default: [],
	effects: [localStorageEffect("toDos")],
});

export const categoryState = atom<Categories>({
	key: "category",
	default: Categories.TO_DO,
});

export const toDoSelector = selector({
	key: "toDoSelector",
	get: ({ get }) => {
		const toDos = get(toDoState);
		const category = get(categoryState);
		return toDos.filter((toDo) => toDo.category === category);
	},
});
