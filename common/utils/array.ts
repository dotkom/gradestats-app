type ItemSelector<TItem, TComparedValue> = (item: TItem) => TComparedValue;

export const filterDistinctBy = <TItem, TComparedValue = TItem>(selector: ItemSelector<TItem, TComparedValue>) => {
  return (itemA: TItem, index: number, list: TItem[]) =>
    index === list.findIndex((itemB) => selector(itemA) === selector(itemB));
};
