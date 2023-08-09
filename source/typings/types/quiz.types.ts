export type GameTopicsType<T> = {
    [Key in keyof typeof T]: T[Key]
};
