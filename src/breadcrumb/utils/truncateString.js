export const truncateString = (str) => {
    const hasDots = str.endsWith('...');

    if (!hasDots) {
        return str.slice(0, -3) + '...';
    } else {
        const index = str.lastIndexOf('...');
        return index > 0 ? str.slice(0, index - 1) + str.slice(index) : str;
    }
}