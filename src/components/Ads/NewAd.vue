<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Create new ad</h1>
                <v-form
                ref="form"
                v-model="valid"
                validation
                >
                  <v-text-field
                    color="indigo"
                    label="Ad title"
                    name="title"
                    :rules="[v => !!v || 'Title is required']"
                    type="text"
                    v-model="title"
                    required
                  />

                  <v-textarea
                    auto-grow
                    dense
                    rows="3"
                    outlined
                    color="indigo"
                    :rules="[v => !!v || 'Description is required']"
                    type="text"
                    label="Ad description"
                    name="description"
                    v-model="description"
                  />
                </v-form>
            </v-flex>
        </v-layout>
        <v-layout row class="mb-3">
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                color="warning"
                class="white--text"
                @click="triggerUpload"
              >
              Upload
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
              <input
              type="file"
              ref="fileInput"
              style="display: none"
              accept="image/*"
              @change="onFileChange"
              >
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageSrc" height="100" v-if="imageSrc">
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="d-flex flex-row">
              <v-flex lg4>
              <v-switch
                v-model="promo"
                label="Add to promo?"
                color="indigo"
              >
              </v-switch>
              </v-flex>
              <v-flex lg8 class="d-flex align-center">
                <v-btn
                class="success"
                @click="createAd"
                :loading="loading"
                :disabled="!valid || !image || loading">
                  Create ad
                </v-btn>
                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        }
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>
