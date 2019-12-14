<template>
<v-dialog width="400px" v-model="modal">
<template v-slot:activator="{ on }">
<v-btn class="red white--text ml-1" v-on="on">Buy</v-btn>
</template>
<v-card>
  <v-container>
    <v-layout row>
      <v-flex xs-12>
        <v-card-title>
          <h1 color="indigo">Do you wan't to buy it?</h1>
        </v-card-title>
      </v-flex>
    </v-layout>
    <v-divider/>
    <v-layout row>
      <v-flex xs-12>
        <v-card-text>
          <v-text-field
            label="Your name"
            name="name"
            color="indigo"
            type="text"
            v-model="name"
          />
          <v-text-field
            label="Your phone"
            name="phone"
            color="indigo"
            type="phone"
            v-model="phone"
          />
        </v-card-text>
      </v-flex>
    </v-layout>
    <v-divider/>
    <v-layout row>
      <v-flex xs-12>
        <v-card-actions>
          <v-spacer/>
          <v-btn
          @click="onCancel"
          :disabled="localLoading"
          >
          Cancel
          </v-btn>
          <v-btn
          class="success"
          @click="onSave"
          :disabled="localLoading"
          :loading="localLoading"
          >
          Buy it!
          </v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-container>
</v-card>
</v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      modal: false,
      name: '',
      phone: '',
      localLoading: false
    }
  },
  methods: {
    onCancel () {
      this.name = ''
      this.phone = ''
      this.modal = false
    },
    onSave () {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true
        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          adId: this.ad.id,
          ownerId: this.ad.ownerId
        }).finally(() => {
          this.name = ''
          this.phone = ''
          this.localLoading = false
          this.modal = false
        })
      }
    }
  }
}
</script>
