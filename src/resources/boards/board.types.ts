interface IColumn {
    id: string;
    title: string;
    order: number;
};

interface IBoard {
    id: string;
    title: string;
    columns: IColumn[];
};

export {
    IColumn,
    IBoard,
};
