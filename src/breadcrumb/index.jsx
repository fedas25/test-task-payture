import React, { useEffect, useCallback, useLayoutEffect, useRef, useState, useMemo } from 'react';
import { addDots } from './utils/addDots';
import { removeThird } from './utils/removeThird';
import { truncateString } from './utils/truncateString';

export const Breadcrumb = React.memo(({ items = [] }) => {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth - 200);
    const [contentWidth, setContentWidth] = useState(0);
    const [visibleItems, setVisibleItems] = useState(items);

    const isFirstRender = useRef(true);
    const initialItems = useMemo(() => (items.length > 2 ? items.slice(0, 2) : []), [items]);
    const containerRef = useRef(null);
    const lastItemRef = useRef("");
    const isTrimming = useRef(true);

    const updateViewportWidth = useCallback(() => {
        setViewportWidth(window.innerWidth - 200);
    }, []);

    const updateContentWidth = useCallback(() => {
        if (containerRef?.current) {
            const width = containerRef.current.scrollWidth;
            setContentWidth(width);
        }
    }, []);

    useEffect(() => {
        updateViewportWidth();
        window.addEventListener('resize', updateViewportWidth);

        updateContentWidth();
        window.addEventListener('resize', updateContentWidth);

        return () => {
            window.removeEventListener('resize', updateViewportWidth);
            window.removeEventListener('resize', updateContentWidth);
        };
    }, []);

    useEffect(() => {
        setVisibleItems(items);
        isFirstRender.current = true;
        isTrimming.current = true;
    }, [items]);

    useLayoutEffect(() => {
        updateContentWidth();
    }, [visibleItems]);

    useEffect(() => {
        const shouldProcessTrimming = viewportWidth < contentWidth - 10 && visibleItems.length > 2;

        if (!isTrimming.current && shouldProcessTrimming) {
            if (isFirstRender.current) {
                setVisibleItems(prev => addDots(prev));
                isFirstRender.current = false;
                isTrimming.current = true;
            } else if (!isTrimming.current) {
                setVisibleItems(prev => removeThird(prev));
                isTrimming.current = true;
            }
        } else if (shouldProcessTrimming) {
            const lastItem = visibleItems[visibleItems.length - 1];
            const hasDots = lastItem.title.endsWith('...');

            lastItemRef.current = !hasDots ? lastItem : lastItemRef.current;

            if (lastItem.title.length > 5) {
                const trimmedItem = {
                    ...lastItem,
                    title: truncateString(lastItem.title),
                };
                setVisibleItems(prev => [
                    ...prev.slice(0, prev.length - 1),
                    trimmedItem,
                ]);
            } else {
                setVisibleItems(prev => [
                    ...prev.slice(0, prev.length - 1),
                    lastItemRef.current
                ]);
                isTrimming.current = false;
            }
        }

        if (visibleItems.length === 3 && !isFirstRender.current) {
            setVisibleItems(prev => initialItems);
            isFirstRender.current = true;
        }
    }, [viewportWidth, contentWidth, visibleItems]);

    return (
        <div
            ref={containerRef}
            style={{
                marginTop: '26px',
                whiteSpace: "nowrap",
                display: "inline-block"
            }}
        >
            {visibleItems.map((item, index) => (
                <React.Fragment key={item.url}>
                    <a
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                            whiteSpace: 'nowrap',
                            fontSize: '16px',
                            display: 'inline-block'
                        }}
                        href={item.url}
                        title={item.title}
                    >
                        {item.title}
                    </a>
                    {index < visibleItems.length - 1 && <span>-</span>}
                </React.Fragment>
            ))}
        </div>
    );
});