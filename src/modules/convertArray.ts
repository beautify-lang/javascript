export const convertArray = <ItemType>(array: ItemType[]) => ({
  toJsonString: ()=> JSON.stringify(array),
  toSet: () => new Set<ItemType>(array),
  toUniqueArray: () => new Array<ItemType>(...new Set<ItemType>(array))
});