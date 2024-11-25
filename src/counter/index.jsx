import { useState, memo } from "react";

export const Counter = memo(() => {
    const [count, setCount] = useState(0);
    return (
        <>
            <button
                onClick={() => setCount(prev => prev + 1)}>
                Counter
            </button>
            <h2>
                Счет: {count}
            </h2>
        </>
    );
});
