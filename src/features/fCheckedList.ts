function fCheckedList<T>(
  e: React.ChangeEvent<HTMLInputElement>,
  objectWantSaveInfo: any,
  listChecked: T[],
  setListChecked: React.Dispatch<React.SetStateAction<T[]>>,
  attrGet: string
) {
  const { checked } = e.target;

  if (checked) {
    const newSelected = [
      ...listChecked,
      (objectWantSaveInfo as any)[attrGet],
    ] as T[];
    setListChecked(newSelected);
  } else {
    const filterUserSelected = listChecked.filter(
      (c) => c !== (objectWantSaveInfo as any)[attrGet]
    );
    setListChecked(filterUserSelected);
  }
}

export default fCheckedList;
