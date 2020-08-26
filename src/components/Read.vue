<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12>
                <template>
                    <div class="text-lg-right">
                        <v-btn dark class="mb-2">New Item</v-btn>
                    </div>
                </template>
                <v-data-table
                        :headers="headers"
                        :items="date">
                    <template slot="items" slot-scope="props">
                        <td :class="headers[0].class">{{ props.item.no }}</td>
                        <td :class="headers[1].class">{{ props.item.title }}</td>
                        <td :class="headers[2].class">{{ props.item.writer }}</td>
                        <td :class="headers[3].class">{{ props.item.time }}</td>
                        <td>
                            <div class="icon-space">
                                <v-icon>fas fa-edit</v-icon>
                            </div>
                            <div class="icon-space">
                                <v-icon>fas fa-trash-alt</v-icon>
                            </div>
                        </td>

                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import data from '../data/index.js'
export default {
    data () {
        return {
            date: data,
            headers: [
                { text: 'no',   value: 'no', sortable: false ,align: 'center'},
                { text: 'title',  value: 'title', sortable: true ,align: 'center'},
                { text: 'writer', value: 'writer', sortable: true ,align: 'center'},
                { text: 'date',  value: 'time', sortable: true ,align: 'center'},
                { text: 'action',  value: 'action', sortable: false ,align: 'center'}
            ]
        }
    },
    // ..
    methods: {
        // ..
        list () {
            if (this.loading) return
            this.loading = true
            this.$axios.get(`article/${this.board._id}`)
                .then(({ data }) => {
                    this.articles = data.ds
                    this.loading = false
                })
                .catch((e) => {
                    this.pop(e.message, 'error')
                    this.loading = false
                })
        },
    }
}
</script>

