export const removeThird = (items) => {
    return [
        items[0],
        items[1],
        ...items.slice(3)
    ];
}