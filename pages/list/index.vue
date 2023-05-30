<template>
  <ListTable :headers="headers" :dataTable="dataTable" />
</template>

<script>
import ListTable from "~/components/ListTable";
import { mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
import listTableMock from "~/components/mockData/listTable.json";
export default {
  name: "ListPage",
  components: {
    ListTable,
  },
  data() {
    return {
      headers: listTableMock.headers,
    };
  },
  computed: {
    ...mapFields({
      dataTable: "dataTable",
    }),
  },
  mounted() {
    this.getList();
  },
  methods: {
    ...mapActions(["getListPost"]),
    async getList() {
      await this.getListPost();
    },
  },
};
</script>
