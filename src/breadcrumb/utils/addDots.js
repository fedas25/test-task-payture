export const addDots = (items) => {
    return [
        items[0],
        { title: '...', url: '#', type: true },
        ...items.slice(2)
    ];
}