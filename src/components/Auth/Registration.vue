<template>
    <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="indigo"
                dark
              >
              <v-toolbar-title>Registration</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                >
                  <v-text-field
                    color="indigo"
                    label="E-Mail"
                    name="Email"
                    :rules="emailRules"
                    prepend-icon="mdi-at"
                    type="email"
                    v-model="email"
                  />

                  <v-text-field
                    color="indigo"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[ rules.required, rules.min]"
                    :type="show ? 'text' : 'password'"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    v-model="password"
                    @click:append="show = !show"
                    counter='6'
                  />
                  <v-text-field
                    color="indigo"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[ rules.required, rules.min, rules.confirmPpassword]"
                    :type="show ? 'text' : 'password'"
                    label="Confirm Password"
                    name="Confirm-Password"
                    prepend-icon="mdi-lock"
                    v-model="confirmPpassword"
                    @click:append="show = !show"
                    counter='6'
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn class="indigo" :dark="valid" @click="onSubmit" :loading="loading" :disabled="!valid || loading">Create account</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPpassword: '',
      valid: true,
      show: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        confirmPpassword: v => v === this.password || 'Пароли не совпадают'
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
      }
    }
  }
}
</script>
