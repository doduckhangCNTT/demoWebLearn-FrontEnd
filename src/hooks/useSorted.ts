function ListsSorted<T>(data: T[], keySort: string, property?: string) {
  if (keySort) {
    let value1, value2;

    const value = [...data]?.sort((a, b) => {
      if (property) {
        value1 = (a[keySort as keyof T] as any)[property]?.toUpperCase();
        value2 = (b[keySort as keyof T] as any)[property]?.toUpperCase();

        // console.log({ value1C: value1, value2C: value2 });
      } else {
        value1 = (a[keySort as keyof T] as any)?.toString().toUpperCase();
        value2 = (b[keySort as keyof T] as any)?.toString().toUpperCase();
      }

      if (value1 && value2) {
        if (value1 < value2) return -1;
        if (value1 > value2) return 1;
      }
      return 0;
    });

    const listSorted = value ? value : [];
    return listSorted;
  }
}

export default ListsSorted;
