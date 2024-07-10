/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const { width, height } = svg.node().getBoundingClientRect();
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    svg.selectAll('*').remove();

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value));

    // eslint-disable-next-line no-unused-vars
    const clip = svg.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("x", margin.left)
      .attr("y", margin.top);

    const lineChart = svg.append('g')
      .attr('clip-path', 'url(#clip)');

    lineChart.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append('g').attr('class', 'x-axis').call(xAxis);
    svg.append('g').attr('class', 'y-axis').call(yAxis);

    const zoom = d3.zoom()
      .scaleExtent([1, 5])
      .translateExtent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])
      .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])
      .on("zoom", zoomed);

    svg.call(zoom);

    function zoomed(event) {
      const newX = event.transform.rescaleX(x);
      const newY = event.transform.rescaleY(y);

      svg.select('.x-axis').call(d3.axisBottom(newX));
      svg.select('.y-axis').call(d3.axisLeft(newY));

      lineChart.select('path')
        .attr('d', d3.line()
          .x(d => newX(d.date))
          .y(d => newY(d.value))(data));
    }

    // Tooltip
    const tooltip = svg
      .append("g")
      .attr("class", "tooltip")
      .style("display", "none");

    tooltip.append("text").attr("x", 15).attr("dy", "1.2em");

    svg.on("mouseover", () => tooltip.style("display", null))
      .on("mouseout", () => tooltip.style("display", "none"))
      .on("mousemove", function (event) {
        const bisectDate = d3.bisector(d => d.date).left;
        const xPos = d3.pointer(event)[0];
        const x0 = x.invert(xPos);
        const i = bisectDate(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        tooltip
          .attr("transform", `translate(${x(d.date)}, ${y(d.value)})`)
          .select("text")
          .text(`Value: ${d.value}`);
      });

  }, [data]);

  return <svg ref={svgRef} width="800" height="400"></svg>;
};

export default LineChart;
