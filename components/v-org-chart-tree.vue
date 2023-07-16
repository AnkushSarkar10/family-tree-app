<script setup>
import OrganizationChart from 'vue3-organization-chart'
import 'vue3-organization-chart/dist/orgchart.css'

const ds = {
    'id': '1',
    'name': 'Lao Lao',
    'title': 'general manager',
    'children': [
        { 'id': '2', 'name': 'Bo Miao', 'title': 'department manager' },
        {
            'id': '3', 'name': 'Su Miao', 'title': 'department manager',
            'children': [
                { 'id': '4', 'name': 'Tie Hua', 'title': 'senior engineer' },
                {
                    'id': '5', 'name': 'Hei Hei', 'title': 'senior engineer',
                    'children': [
                        { 'id': '6', 'name': 'Pang Pang', 'title': 'engineer' },
                        { 'id': '7', 'name': 'Xiang Xiang', 'title': 'UE engineer' }
                    ]
                }
            ]
        },
        { 'id': '8', 'name': 'Hong Miao', 'title': 'department manager' },
        { 'id': '9', 'name': 'Chun Miao', 'title': 'department manager' }
    ]
}

const nodeClick = (data) => {
    console.log(data);
}

</script>

<template>
    <div>
        <organization-chart :datasource="ds" pan="true" @node-click="nodeClick">
            <template slot-scope="{{ nodeData }}">
                <node :name="'Ankush'"/>
            </template>
        </organization-chart>
    </div>
</template>
  
<style scoped></style>