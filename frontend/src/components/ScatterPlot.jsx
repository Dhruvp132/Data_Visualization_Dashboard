/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ data }) => {
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

    const clip = svg.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("x", margin.left)
      .attr("y", margin.top);

    const scatterGroup = svg.append('g')
      .attr('clip-path', 'url(#clip)');

    scatterGroup.selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => x(d.date))
      .attr('cy', d => y(d.value))
      .attr('r', 5)
      .attr('fill', 'steelblue')
      .append('title')
      .text(d => `Value: ${d.value}`);

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

      scatterGroup.selectAll('circle')
        .attr('cx', d => newX(d.date))
        .attr('cy', d => newY(d.value));

      svg.select('.x-axis').call(d3.axisBottom(newX));
      svg.select('.y-axis').call(d3.axisLeft(newY));
    }

  }, [data]);

  return <svg ref={svgRef} width="800" height="400"></svg>;
};

export default ScatterPlot;
