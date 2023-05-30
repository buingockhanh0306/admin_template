<template>
  <v-data-table
    :headers="headers"
    :items="dataTable"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:item.stt="{ item, index }">
      <p>{{ index + 1 }}</p>
    </template>
    <template v-slot:item.attachment="{ item }">
      <v-img
        class="imageTable"
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="150"
        max-width="250"
        :src="item.attachment"
      ></v-img>
    </template>
    <template v-slot:item.content="{ item }">
      <p v-html="item.content"></p>
    </template>
    <template v-slot:item.createdAt="{ item }">
      <p>{{ convertDateTime(item.createdAt) }}</p>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Danh sách bài viết</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" @click="handleCreate">
              Thêm bài viết
            </v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="handleDelete">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="handleUpdate(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from "vuex";
import { convertDateTime } from "~/utils/convertDateTime";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),
  props: {
    headers: {
      type: Array,
      default: [],
    },
    dataTable: {
      type: Array,
      default: [],
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    convertDateTime,
    ...mapActions(["deletePost", "getListPost"]),
    handleUpdate(item) {
      this.$router.push(`/list/update?id=${item.id}`);
    },

    deleteItem(item) {
      this.editedIndex = item._id;
      this.dialogDelete = true;
    },

    async handleDelete() {
      await this.deletePost({ id: this.editedIndex });
      await this.getListPost();
      this.dialogDelete = false;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },

    handleCreate() {
      this.$router.push("/list/create/");
    },
  },
};
</script>

<style scoped>
.imageTable {
  margin: 10px;
  border-radius: 4px;
}
</style>
