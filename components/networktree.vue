<script setup lang="ts">
import { Nodes, Edges } from "v-network-graph"
import * as vNG from "v-network-graph"
const nodes: Nodes = {
    node1: { name: "Node 1" },
    node2: { name: "Node 2" },
    node3: { name: "Node 3" },
    node4: { name: "Node 4" },
}

const edges: Edges = {
    edge1: { source: "node1", target: "node2" },
    edge2: { source: "node2", target: "node3" },
    edge3: { source: "node3", target: "node4" },
}
const configs = vNG.defineConfigs({
    node: {
        selectable: false,
        normal: {
            type: "rect",
            width: 80,
            height: 70,
            borderRadius: 8
        },
        hover: {
            color: "#f0f0f0",
        },
        label: {
            fontSize: 12,
            color: "#000000",
            direction: "center",
        },
    },
    edge: {
        normal: {
            width: 1,
            color: "#444444",
        },
        hover: {
            color: "#222222",
        },
        marker: {
            target: {
                type: "angle",
                width: 10,
                height: 10,
                margin: -10,
            },
        },
    },
})

</script>

<template>
    <v-network-graph class="graph" :nodes="nodes" :edges="edges">
        <template #override-node="{ nodeId, scale, config, ...slotProps }">
            <!-- <text>{{ nodes[nodeId].name }}</text> -->
            <node :name="nodes[nodeId].name" :nodeId="nodeId" :scale="scale" :config="config" :slotProps="slotProps"></node>
        </template>
    </v-network-graph>
</template>

<style>
.graph {
    width: 800px;
    height: 600px;
    border: 1px solid #000;
}
</style>