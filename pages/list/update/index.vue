<template>
  <FormEdit
    title="Chỉnh sửa bài viết"
    :formData="formData"
    @handleSubmit="handleCreate"
    btnSubmit="Cập nhật"
  />
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import FormEdit from "~/components/FormEdit";
export default {
  components: {
    editor: Editor,
    FormEdit,
  },
  data() {
    return {
      formData: {
        content: "",
        title: "",
        slug: "",
        author: "",
        note: "",
      },
    };
  },
  methods: {
    handleCreate(formData) {
      console.log(formData);
    },
  },
};
</script>

<style lang="scss" scoped></style>
