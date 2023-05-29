<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="title"
            label="Tiêu đề"
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="slug"
            label="Slug"
            outlined
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="author"
            label="Tác giả"
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="note"
            label="Ghi chú"
            outlined
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <editor
            api-key="hmu2ak71ygywm57sw3dj6f6sk92weo9ens54h8cv6sjpo37i"
            v-model="content"
            :init="initEditor"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-col cols="12" sm="2">
          <v-btn depressed color="error" @click="handleCancel">
            Quay lại
          </v-btn>
          <v-btn depressed color="primary" @click="handleCreate">
            Thêm mới
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  components: {
    editor: Editor,
  },
  data: () => ({
    content: "",
    title: "",
    slug: "",
    author: "",
    note: "",
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
    initEditor: {
      height: 500,
      menubar: false,
      plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste code help wordcount",
      ],
      toolbar:
        "undo redo | fontselect | formatselect link image | bold italic underline | fontsizeselect  forecolor backcolor |\
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help",
    },
  }),
  methods: {
    handleCancel() {
      this.$router.push("/list/");
    },
    handleCreate() {
      const data = {
        title: this.title,
        slug: this.slug,
        author: this.author,
        note: this.note,
        content: this.content,
      };
      this.$axios.get("/khanh");
    },
  },
};
</script>

<style lang="scss" scoped></style>
