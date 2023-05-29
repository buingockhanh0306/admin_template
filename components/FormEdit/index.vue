<template>
  <v-form>
    <p class="font-weight-black">{{ title }}</p>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.title"
            label="Tiêu đề"
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.slug"
            label="Slug"
            outlined
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.author"
            label="Tác giả"
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.note"
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
          <v-btn depressed color="primary" @click="handleSubmit">
            {{ btnSubmit }}
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
  props: {
    title: {
      type: String,
      default: "",
    },
    btnSubmit: {
      type: String,
      default: "",
    },
    formData: {
      type: Object,
      default: {},
    },
  },
  data: () => ({
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
    handleSubmit() {
      this.$emit("handleSubmit", this.formData);
    },
  },
};
</script>

<style lang="scss" scoped></style>
