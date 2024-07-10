/* eslint-disable react/prop-types */
// src/components/BarChart.js
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const { width, height } = svg.node().getBoundingClientRect();
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    svg.selectAll('*').remove();

    const x = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);

    const zoom = d3.zoom()
      .scaleExtent([1, 5])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on("zoom", zoomed);

    svg.call(zoom);

    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    const barsGroup = svg.append('g');

    barsGroup.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => x(d.category))
      .attr('y', d => y(d.value))
      .attr('height', d => y(0) - y(d.value))
      .attr('width', x.bandwidth())
      .attr('fill', 'steelblue')
      .append('title')
      .text(d => `Value: ${d.value}`);

    function zoomed(event) {
      const newX = event.transform.rescaleX(x);
      barsGroup.selectAll('rect')
        .attr('x', d => newX(d.category))
        .attr('width', newX.bandwidth());

      svg.select('.x-axis').call(d3.axisBottom(newX));
    }

    svg.append('g').attr('class', 'x-axis').call(xAxis);
    svg.append('g').attr('class', 'y-axis').call(yAxis);

  }, [data]);

  return <svg ref={svgRef} width="800" height="400"></svg>;
};

export default BarChart;
