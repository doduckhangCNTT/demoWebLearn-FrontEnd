const fCheckedAll = (
  toggleCheckedAll: boolean,
  listEleOfPage: any,
  setCheckedList: React.Dispatch<React.SetStateAction<string[]>>,
  attrGet: string
) => {
  if (!toggleCheckedAll) {
    const checkedUser = listEleOfPage.map((i: any) => i[attrGet]);
    setCheckedList(checkedUser);
  } else {
    setCheckedList([]);
  }
};

export default fCheckedAll;
