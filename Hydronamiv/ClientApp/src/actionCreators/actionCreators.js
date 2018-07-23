const changeValueType = "CHANGE_VALUE";
const loadItemsType = "LOAD_ITEMS";

export function changeValue(item) {
    return {
        type: changeValueType,
        items
    }
}

export function loadItems(items) {
    return {
        type: loadItemsType,
        items
    }
}