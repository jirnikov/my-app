<template>
  <div v-if="!loading">
    <v-container fluid >
        <v-layout>
            <v-flex xs12>
                <v-carousel
                cycle
                height="400"
                show-arrows-on-hover
              >
                <v-carousel-item
                  v-for="slide in promoAds"
                  :key="slide.id"
                  :src="slide.imageSrc"
                >
                <div class="car-link">
                  <v-btn class="error" :to="'/ad/' + slide.id">{{ slide.title }}</v-btn>
                </div>
                </v-carousel-item>
              </v-carousel>
            </v-flex>
        </v-layout>
    </v-container>
    <v-container grid-list-lg>
        <v-layout row>
            <v-flex
            xs12
            sm6
            md4
            v-for="slide in ads"
            :key="slide.id"
            >
              <v-card>
                <v-img
                  :src="slide.imageSrc"
                  height="200px"
                >
                </v-img>
                <v-card-title>
                  {{slide.title}}
                </v-card-title>

                <v-card-text>
                    {{slide.description}}
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="indigo white--text" :to="'/ad/' + slide.id">Open</v-btn>
                  <AppBuyModal :ad="slide" />
                </v-card-actions>
              </v-card>
            </v-flex>
        </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 pt-5 class="text-center">
          <v-progress-circular
            indeterminate
            size="100"
            color="indigo"
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    promoAds () {
      return this.$store.getters.promoAds
    },
    ads () {
      return this.$store.getters.ads
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
<style scoped>
  .car-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, 0.3);
    transform: translate(-50%, 0);
    padding: 5px 15px;
}
</style>
