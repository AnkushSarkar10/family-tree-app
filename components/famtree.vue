<template>
  <div class="tree-container min-h-screen">
    <svg ref="container" class="tree-svg"></svg>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import * as d3 from 'd3';

const container = ref();

const props = defineProps(['data']);

onMounted(() => {
  const margin = { top: 20, right: 50, bottom: 20, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const svg = d3
    .select(container.value)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const treeLayout = d3.tree().size([width, height]);

  const rootNode = d3.hierarchy(props.data);
  const links = treeLayout(rootNode).links();
  const nodes = treeLayout(rootNode).descendants();

  // Draw links
  const link = svg
    .selectAll('.link')
    .data(links)
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', (d) => {
      const x1 = d.source.x;
      const y1 = d.source.y + 20;
      const x2 = d.target.x;
      const y2 = d.target.y - 12;
      const yMid = (y1 + y2) / 2;
      return `M${x1},${y1}V${yMid}H${x2}V${y2}`;
    });

  // Draw nodes
  const node = svg
    .selectAll('.node')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.x},${d.y})`);

  node.append('rect')
    .attr('width', 100)
    .attr('height', 30)
    .attr('x', -50)
    .attr('y', -13)
    .attr('rx', 3)
    .attr('ry', 3)
    .style('fill', 'none')
    .style('stroke', '#00a0b0')
    .style('stroke-width', '2px');

  node
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .text((d) => d.data.name);

  // Add spouse nodes
  const spouseNodes = nodes
    .filter((d) => d.data.spouse)
    .map((d) => ({
      name: d.data.spouse,
      x: d.x + 120,
      y: d.y
    }));

  const spouseNode = svg
    .selectAll('.spouse-node')
    .data(spouseNodes)
    .enter()
    .append('g')
    .attr('class', 'spouse-node')
    .attr('transform', (d) => `translate(${d.x},${d.y})`);

  spouseNode.append('rect')
    .attr('width', 100)
    .attr('height', 30)
    .attr('x', -50)
    .attr('y', -13)
    .attr('rx', 3)
    .attr('ry', 3)
    .style('fill', 'none')
    .style('stroke', '#ff6b6b')
    .style('stroke-width', '2px');

  spouseNode
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .text((d) => d.name);
});
</script>

<style>
.tree-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tree-svg {
  width: 600px;
  height: 600px;
}

.node {
  display: inline-block;
  text-align: center;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 1.7px;
}
</style>
