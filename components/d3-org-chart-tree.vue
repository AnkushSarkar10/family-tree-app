<script setup>
import { OrgChart } from 'd3-org-chart';
import * as d3 from "d3";
import { ModalsContainer } from 'vue-final-modal'
import { jsPDF } from "jspdf";

const svgElementContainer = ref(null);
const { fetchUserFamilyCsv, parseCSV, nodeClickHandler } = useUtils();
const chart = ref();

const downloadPdf = () => {
    console.log('get pdf')
    chart.value.exportImg({
        save: false,
        onLoad: (base64 => {
            var pdf = new jsPDF();
            var img = new Image()
            img.src = base64;
            img.onload = function () {
                pdf.addImage(img, 'JPEG', 5, 5, 595 / 3, img.height / img.width * 595 / 3);
                pdf.save('tree.pdf');
            }
        })
    })

}
// const data = d3.csv(
//     'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv'
// ).then((dataFlattened) => {

// https://github.com/bumbeishvili/org-chart/issues/24#issuecomment-1575060647

fetchUserFamilyCsv().then((data) => {
    // console.log(data.value)
    parseCSV(data.value).then((dataFlattened) => {
        console.log(dataFlattened)
        chart.value = new OrgChart()
            .container(svgElementContainer.value)
            .data(dataFlattened)
            .nodeHeight((d) => 90)
            .nodeWidth((d) => 220)
            .childrenMargin((d) => 50)
            .compactMarginBetween((d) => 25)
            .compactMarginPair((d) => 50)
            .neightbourMargin((a, b) => 25)
            .siblingsMargin((d) => 120)
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
                let nodeHtml = '';
                const nodeWidth = `min-w-[220px]`
                const nodeHeight = `min-h-[90px]`
                const spouceNodeWidth = `min-w-[150px]`

                if (d.data.hasSpouse == "t") {
                    const spouseName = d.data.spouseName;
                    if (d.data.gender == "M") {
                        nodeHtml += `
                            <div class="relative flex gap-7 -translate-x-1/2 -right-14">
                                <div class="relative shadow-md bg-white hover:bg-sky-100 ${spouceNodeWidth} ${nodeHeight} px-1 rounded-md border border-solid ${d.data.gender == 'M' ? "border-red-500" : "border-blue-500"}">
                                    <img src="/empty_user.png"
                                        class="absolute -top-8 left-1 rounded-full w-16 h-w-16" />
                                    <div class="text-black text-lg font-semibold text-center mt-6">${d.data.name}</div>
                                    <div class="text-black text-sm font-extralight text-center">${d.data.isUser == 't' ? "You" : ""}</div>
                                    <hr class="pointer-events-none w-7 h-[1.3px] bg-slate-200 absolute -right-7 -translate-y-1" />
                                </div>
                                
                                <div class="relative shadow-md bg-white ${spouceNodeWidth} ${nodeHeight} px-1 rounded-md border border-solid ${d.data.spouseGender == 'M' ? "border-red-500" : "border-blue-500"}">
                                    <img src="/empty_user.png"
                                        class="absolute -top-8 left-1 rounded-full w-16 h-w-16" />
                                    <div class="text-black text-lg font-semibold text-center mt-6">${spouseName}</div>
                                </div>
                            </div>
                  `;
                    } else {
                        nodeHtml += `
                        <div class="relative flex gap-7 -translate-x-1/2 -right-14">
                                <div class="relative shadow-md bg-white hover:bg-sky-100 ${spouceNodeWidth} ${nodeHeight} px-1 rounded-md border border-solid ${d.data.spouseGender == 'M' ? "border-red-500" : "border-blue-500"}">
                                    <img src="/empty_user.png"
                                        class="absolute -top-8 left-1 rounded-full w-16 h-w-16" />
                                    <div class="text-black text-lg font-semibold text-center mt-6">${spouseName}</div>
                                    <hr class="pointer-events-none w-7 h-[1.3px] bg-slate-200 absolute -right-7 -translate-y-1" />
                                    </div>
                                    
                                    <div class="relative shadow-md bg-white ${spouceNodeWidth} ${nodeHeight} px-1 rounded-md border border-solid ${d.data.gender == 'M' ? "border-red-500" : "border-blue-500"}">
                                        <img src="/empty_user.png"
                                        class="absolute -top-8 left-1 rounded-full w-16 h-w-16" />
                                        <div class="text-black text-lg font-semibold text-center mt-6">${d.data.name}</div>
                                        <div class="text-black text-sm font-extralight text-center">${d.data.isUser == 't' ? "You" : ""}</div>
                                </div>
                            </div>
                        `

                    }
                } else {
                    nodeHtml += `
                    <div class="relative shadow-md bg-white hover:bg-sky-100 ${nodeWidth} ${nodeHeight} rounded-md border border-solid ${d.data.gender == 'M' ? "border-red-500" : "border-blue-500"}">
                        <img src="/empty_user.png"
                            class="absolute -top-8 left-1 rounded-full w-16 h-w-16" />
                        <div class="text-black text-lg font-semibold text-center mt-6">${d.data.name}</div>
                        <div class="text-black text-xs font-extralight text-center">${d.data.isUser == 't' ? "You" : ""}</div>
                    </div>
                  `;
                }
                return nodeHtml;
            })
            .onNodeClick((nodeid) => {
                dataFlattened.filter(data => {
                    if (data.id === nodeid) {
                        nodeClickHandler(data);
                    }
                });
            })
            .compact(false)
            .defaultFont('Inter');

        // changing the links for persons who has spouse
        const linkShift = -70;
        chart.value.layoutBindings().top.linkX = (d) => {
            if (d.data.hasSpouse == 'f') {
                return d.x;
            } else if (d.data.gender == 'M') {
                return d.x + linkShift;
            } else {
                return d.x - linkShift;
            }
        };

        chart.value.render().expandAll();
    })
});


</script>

<template>
    <ModalsContainer />
    <div class="relative w-full h-screen overflow-hidden">
        <div ref="svgElementContainer" class="relative h-screen z-10"></div>
        <div class="absolute right-20 bottom-20 flex flex-col gap-4 justify-center items-center">
            <button @click="chart.zoomIn()" class="z-20">
                <Icon name="carbon:add-alt" color="black" class="text-xl md:text-5xl" />
            </button>
            <button @click="chart.zoomOut()" class="z-20">
                <Icon name="carbon:subtract-alt" color="black" class="text-xl md:text-5xl" />
            </button>
            <button @click="chart.fit()" class="z-20">
                <Icon name="material-symbols:fit-screen-outline-sharp" color="black" class="text-xl md:text-5xl" />
            </button>
            <button @click="downloadPdf" class="z-20">
                <Icon name="carbon:document-pdf" color="black" class="text-xl md:text-5xl" />
            </button>
        </div>
        <img src="/dots.jpg" class="absolute h-screen w-full top-0 left-0 opacity-5">
    </div>
</template>

<style scoped></style>