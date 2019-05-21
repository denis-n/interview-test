export interface IThing {
  id: string;
  name: string;
  children: IChildThing[];
}

export interface IChildThing {
  id: string;
  name: string;
  parentId: string;
}
