import { useEffect, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

/**
 * Hook, that returns the current dimensions of an HTML element.
 * Doesn't play well with SVG.
 */

const useResizeObserver = (ref: { current: any; }) => {
    const [dimensions, setDimensions] = useState(null) ;
    useEffect(() => {
        const observeTarget = ref.current;
        const resizeObserver: ResizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                // @ts-ignore
                setDimensions(entry.contentRect);
            });
        });
        resizeObserver.observe(observeTarget);
        return () => {
            resizeObserver.unobserve(observeTarget);
        };
    }, [ref]);
    return dimensions;
};

export default useResizeObserver;