<template>
  <FormEdit
    title="Thêm bài viết"
    :formData="formData"
    @handleSubmit="handleCreate"
    btnSubmit="Thêm mới"
  />
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import FormEdit from "~/components/FormEdit";
import { mapActions } from "vuex";
export default {
  components: {
    editor: Editor,
    FormEdit,
  },
  data() {
    return {
      formData: {
        title: "",
        attachment: "",
        content: "",
        author: "",
      },
    };
  },
  methods: {
    ...mapActions(["createPost"]),
    async handleCreate(formData) {
      await this.createPost(formData);
      this.$router.push("/list/");
    },
  },
};
</script>

<style lang="scss" scoped></style>
