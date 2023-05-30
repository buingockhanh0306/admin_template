<template>
  <v-form>
    <p class="font-weight-black">{{ title }}</p>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.title"
            label="Tiêu đề"
            :rules="rules"
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.author"
            :rules="rules"
            label="Tác giả"
            outlined
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-file-input
            v-model="imageSrc"
            label="Upload ảnh minh họa"
            shaped
          ></v-file-input>
        </v-col>
        <v-col cols="12" sm="6">
          <v-img
            class="imagePreview"
            :src="imageBase64"
            max-height="300"
            max-width="500"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <editor
            api-key="hmu2ak71ygywm57sw3dj6f6sk92weo9ens54h8cv6sjpo37i"
            v-model="formData.content"
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
  name: "FormEdit",
  components: {
    editor: Editor,
  },
  props: {
    type: {
      type: String,
      default: "",
    },
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
    imageSrc: "",
    imageBase64: "",
    rules: [(value) => !!value || "Vui lòng nhập vào trường này."],
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
  watch: {
    imageSrc(value) {
      this.createBase64Image(value);
      console.log();
    },
  },
  methods: {
    handleCancel() {
      this.$router.push("/list/");
    },
    handleSubmit() {
      this.$emit("handleSubmit", {
        ...this.formData,
        attachment: this.imageBase64,
      });
    },
    createBase64Image(FileObject) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imageBase64 = event.target.result;
      };
      reader.readAsDataURL(FileObject);
    },
  },
};
</script>

<style>
.imagePreview {
  border-radius: 10px;
}
</style>
