import React, {useRef, useEffect, useState} from "react";
import {
    select,
    scaleLinear,
    scaleTime,
    scaleOrdinal,
    line,
    max,
    min,
    extent,
    pointer,
    curveCardinal,
    schemeCategory10,
    axisBottom,
    axisLeft,
    timeFormat,
    bisector,
    format, zoom,
} from "d3";
import useResizeObserver from "../useResizeObserver";


/**
 LineChart Component
 */

function MultiLineChart({ data, highlightedLines }) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [currentZoomState, setCurrentZoomState] = useState();

    // render chart on the first load and on every data/resizing change
    useEffect(() => {

        const svg = select(svgRef.current);
        const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

        // highlighted lines with order
        const lines = {
            max: highlightedLines.lines.max,
            avg: highlightedLines.lines.avg,
            min: highlightedLines.lines.min
        };

        const keys = Object.keys(lines).filter((e) => {return lines[e];});

        const formatDate = timeFormat("%Y-%m-%d %H:%M:%S.%L"),
              bisectDate = bisector(d => d.x).left,
              formatValue = format(",.0f");

        // sort data in ascending order
        data.sort((a,b) => {return a.x - b.x});

        // scales
        const xScale = scaleTime()
            .range([0, width + 1])
            .domain(extent(data, d => d.x));

        if (currentZoomState) {
            const newXScale = currentZoomState.rescaleX(xScale);
            xScale.domain(newXScale.domain());
        }

        const yScale = scaleLinear()
            .range([height, 0]);

        const z = scaleOrdinal(schemeCategory10)
            .domain(["max", "avg", "min"]);

        // line generator
        const lineGenerator = line()
            .curve(curveCardinal)
            .x(d => xScale(d.x))
            .y(d => yScale(d.measures));

        // axes
        const xAxis = axisBottom(xScale)
            .tickFormat(timeFormat("%d %b"))
            .ticks(5);

        svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        svg.select(".x-axis")
            .attr("transform", `translate(0, ${height})`)
            .transition().duration(1000)
            .call(xAxis)
            .selectAll("text")
            .attr("text-anchor", "middle");

        const yAxis = axisLeft(yScale);
        svg.select(".y-axis")
            .call(yAxis);

        const focus = svg.append("g")
            .attr("class", "focus")
            .attr("clip-path", "url(#clipPath)") // clip the rectangle
            .style("display", "none");

        focus.append("line").attr("class", "lineHover")
            .style("stroke", "#999")
            .attr("stroke-width", 1)
            .style("shape-rendering", "crispEdges")
            .style("opacity", 0.5)
            .attr("y1", -height)
            .attr("y2",0);

        focus.append("text").attr("class", "lineHoverDate")
            .attr("text-anchor", "middle")
            .attr("font-size", 12)
            .attr("font-family", "Verdana")
            .attr("fill", "#2b2929");

        svg.append("rect")
            .attr("class", "overlay")
            .attr("x", 0)
            .attr("width", width)
            .attr("height", height);

        // Restructuring data
        const metrics = keys.map(function(id) {
            return {
                id: id,
                values: data.map(d => {return {x: d.x, measures: +d[id]}})
            };
        });

        yScale.domain([
                min(metrics, d => min(d.values, c => c.measures)),
                max(metrics, d => max(d.values, c => c.measures))
        ]).nice();

        svg.selectAll(".y-axis")
            .call(axisLeft(yScale).tickSize(-width));

        svg.selectAll(".metrics")
            .data(metrics)
            .join("path")
            .attr("class", "line metrics")
            .attr("clip-path", "url(#clip)")
            .style("stroke", d => z(d.id))
            .transition().duration(750)
            .attr("d", d => lineGenerator(d.values))
            .attr("clip-path", "url(#clip)");

        tooltip(keys);

        function tooltip(keys) {

            focus.selectAll(".lineHoverText")
                .data(keys)
                .join("text")
                .attr("class", "lineHoverText")
                .style("fill", d => z(d))
                .attr("text-anchor", "start")
                .attr("font-size", 12)
                .attr("dy", (_, i) => 1 + i * 2 + "em");

            focus.selectAll(".hoverCircle")
                .data(keys)
                .join("circle")
                .attr("class", "hoverCircle")
                .style("fill", d => z(d))
                .attr("r", 2.5);

            svg.selectAll(".overlay")
                .on("mouseout", function () {
                    focus.style("display", "none");
                })
                .on("mousemove", mousemove);
        }

        // prevent a potential tooltip disorder caused at the very beginning of rendering
        let zooming = true;
        setTimeout(() => zooming = false, 100);

            function mousemove(e) {

                // disable this while zooming
                if(zooming) return;

                // show focus element including tooltip
                focus.style("display", null);

                let x0 = xScale.invert(pointer(e, this)[0]);
                let i = bisectDate(data, x0, 1),
                    d0 = data[i - 1],
                    d1 = data[i],
                    d = x0 - d0.x > d1.x - x0 ? d1 : d0;

                focus.selectAll(".lineHover")
                    .attr("transform", "translate(" + xScale(d.x) + "," + height + ")");

                focus.select(".lineHoverDate")
                    .attr("transform", "translate(" + xScale(d.x) + "," + (height + 45) + ")")
                    .text(formatDate(d.x));

                focus.selectAll(".hoverCircle")
                    .attr("cy", e => yScale(d[e]))
                    .attr("cx", xScale(d.x));

                focus.selectAll(".lineHoverText")
                    .attr("transform", "translate(" + (xScale(d.x)) + "," + height / 2.5 + ")")
                    .text(e => e + " " + formatValue(d[e]));

                xScale(d.x) > (width - width / 4)
                    ? focus.selectAll("text.lineHoverText")
                        .attr("text-anchor", "end")
                        .attr("dx", -10)
                    : focus.selectAll("text.lineHoverText")
                        .attr("text-anchor", "start")
                        .attr("dx", 10)
            }

        // zoom
        const zoomBehavior = zoom()
            .scaleExtent([1, 5])
            .translateExtent([
                [0, 0],
                [width, height],
            ])
            .on("zoom", (event) => {
                zooming = true;
                focus.style("display", "none");
                const zoomState = event.transform;
                setCurrentZoomState(zoomState);
            })
            .on("end", () => setTimeout(() => {
                zooming = false;
            }, 3000));

        svg.call(zoomBehavior);

    }, [data, dimensions, highlightedLines, currentZoomState]);

    return (
        <React.Fragment>
            <div ref={wrapperRef}>
                <svg ref={svgRef} style={{display: "block", width: "100%", height: "410px", overflow: "visible"}}>
                    <g className="x-axis" />
                    <g className="y-axis" />
                </svg>
            </div>
        </React.Fragment>
    );
}

export default MultiLineChart;