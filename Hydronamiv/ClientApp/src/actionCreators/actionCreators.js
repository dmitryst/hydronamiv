export const changeValueType = "CHANGE_VALUE";
export const loadItemsType = "LOAD_ITEMS";

export function changeValue(item) {
    return {
        type: changeValueType,
        item
    }
}

export function loadItems(items) {
    return {
        type: loadItemsType,
        items
    }
}