<script setup>
import { OrgChart } from 'd3-org-chart';
import * as d3 from "d3";

const svgElementContainer = ref(null);

// const data = d3.csv(
//     'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv'
// ).then((dataFlattened) => {
const data = d3.json(
    'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv'
).then((dataFlattened) => {
    // console.log(dataFlattened)
    new OrgChart()
        .container(svgElementContainer.value)
        .data(dataFlattened)
        .nodeHeight((d) => 90)
        .nodeWidth((d) => {
            return 220;
        })
        .childrenMargin((d) => 50)
        .compactMarginBetween((d) => 25)
        .compactMarginPair((d) => 50)
        .neightbourMargin((a, b) => 25)
        .siblingsMargin((d) => 25)
        .buttonContent(({ node, state }) => {
            return `<div style="px;color:#716E7B;border-radius:5px;padding:4px;font-size:10px;margin:auto auto;background-color:white;border: 1px solid #E4E2E9"> <span style="font-size:9px">${node.children
                ? `<i class="fas fa-angle-up"></i>`
                : `<i class="fas fa-angle-down"></i>`
                }</span> ${node.data._directSubordinates}  </div>`;
        })
        .linkUpdate(function (d, i, arr) {
            d3.select(this)
                .attr('stroke', (d) =>
                    d.data._upToTheRootHighlighted ? '#152785' : '#E4E2E9'
                )
                .attr('stroke-width', (d) =>
                    d.data._upToTheRootHighlighted ? 5 : 1
                );

            if (d.data._upToTheRootHighlighted) {
                d3.select(this).raise();
            }
        })
        .nodeContent(function (d, i, arr, state) {
            console.log(d);
            const color = '#FFFFFF';
            return `
                        <div style="font-family: 'Inter', sans-serif;background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:10px;border: 1px solid #E4E2E9">
                           <div style="background-color:${color};position:absolute;margin-top:-25px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
                           <img src=" ${d.data.imageUrl
                }" style="position:absolute;margin-top:-20px;margin-left:${20}px;border-radius:100px;width:40px;height:40px;" />

                          <div style="color:#08011E;position:absolute;right:20px;top:17px;font-size:10px;"><i class="fas fa-ellipsis-h"></i></div>

                          <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:32px"> ${d.data.name
                } </div>
                          <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${d.data.positionName
                } </div>
                       </div>
              `;

        })
        .render();
});

</script>

<template>
    <div ref="svgElementContainer" class="h-full w-full"></div>
</template>

<style scoped></style>