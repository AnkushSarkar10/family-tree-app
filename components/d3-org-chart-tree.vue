<script setup>
import { OrgChart } from 'd3-org-chart';
import * as d3 from "d3";

const svgElementContainer = ref(null);
const { fetchUserFamilyCsv, parseCSV } = useUtils();
const chart = ref();

// const data = d3.csv(
//     'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv'
// ).then((dataFlattened) => {

// https://github.com/bumbeishvili/org-chart/issues/24#issuecomment-1575060647

fetchUserFamilyCsv().then((data) => {
    // console.log(data.value)
    parseCSV(data.value).then((dataFlattened) => {
        // console.log(dataFlattened)
        chart.value = new OrgChart()
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
                if (d.data.hasSpouse == "t") {
                    const color = '#FFFFFF';
                    const spouseName = d.data.spouseName;
                    const spouseGender = d.data.spouseGender;
                    return `
                    <div class="relative flex gap-7 -translate-x-1/2 right-4">
                        <div class="relative bg-[${color}] min-w-[${d.width}px] min-h-[${d.height}px] rounded-xl border border-solid border-[#E4E2E9]">
                            <img src="https://d32ogoqmya1dw8.cloudfront.net/images/serc/empty_user_icon_256.v2.png"
                                class="absolute -top-8 left-1 rounded-full w-16 h-w-16" />
                            <div class="text-black text-lg font-semibold text-center mt-6">${d.data.name}</div>
                            <div class="text-black text-sm font-extralight text-center">${d.data.isUser == 't' ? "You" : ""}</div>
                            <hr class="w-7 h-[2px] bg-slate-200 absolute -right-7 -translate-y-1" />
                        </div>
                        
                        <div class="relative bg-[${color}] min-w-[${d.width}px] min-h-[${d.height}px] rounded-xl border border-solid border-[#E4E2E9]">
                            <img src="https://d32ogoqmya1dw8.cloudfront.net/images/serc/empty_user_icon_256.v2.png"
                                class="absolute -top-8 left-1 rounded-full w-16 h-w-16" />
                            <div class="text-black text-lg font-semibold text-center mt-6">${spouseName}</div>
                            <div class="text-black text-sm font-extralight text-center">${d.data.isUser == 't' ? "You" : ""}</div>
                        </div>
                    </div>
                  `;
                } else {
                    const color = '#fffff2';
                    return `
                    <div class="relative bg-[${color}] min-w-[${d.width}px] min-h-[${d.height}px] rounded-xl border border-solid border-[#E4E2E9]">
                        <img src="https://d32ogoqmya1dw8.cloudfront.net/images/serc/empty_user_icon_256.v2.png"
                            class="absolute -top-8 left-1 rounded-full w-16 h-w-16" />
                        <div class="text-black text-lg font-semibold text-center mt-6">${d.data.name}</div>
                        <div class="text-black text-xs font-extralight text-center">${d.data.isUser == 't' ? "You" : ""}</div>
                    </div>
                  `;
                }

            })
            .onNodeClick((nodeid) => {
                // console.log(nodeid);
            })
            .compact(false);
        // changing the links for persons who has spouse
        // const linkShift = Math.round((320 + 10) / 2);
        // chart.value.layoutBindings().top.linkX = (d) => {
        //     return 1000
        // };
        chart.value.render();
    })
});


</script>

<template>
    <div ref="svgElementContainer" class="h-full w-full"></div>
</template>

<style scoped></style>