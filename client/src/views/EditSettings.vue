<template>
  <v-layout>
    <v-flex>
      <v-alert
        :value="isFormSubmitted"
        type="info"
        transition="scale-transition"
        dismissible
        outlined
      >Your settings got updated!</v-alert>
      <v-card>
        <CardHeading>Edit settings</CardHeading>
        <v-divider></v-divider>
        <v-card-text>
          <v-layout justify-space-between wrap class="ma-3">
            <v-flex md6 xs12>
              <v-text-field
                v-model="$v.howManyInDefaultTest.$model"
                :error-messages="
              isFormSubmitted && $v.howManyInDefaultTest.$invalid
                ? 'This field is required!'
                : ''
            "
                label="Number of questions in default test"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 class="mt-1">
              <v-btn color="primary" @click="formSubmit">Update settings</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import CardHeading from "./../components/generic/CardHeading";

export default {
  name: "EditSettings",
  components: {
    CardHeading
  },
  data() {
    return {
      howManyInDefaultTest: 0,
      isFormSubmitted: false
    };
  },
  validations: {
    howManyInDefaultTest: {
      required
    }
  },
  computed: {
    ...mapState(["settings"])
  },
  created() {
    Object.assign(this.$data, { ...this.settings });
  },
  methods: {
    ...mapActions(["updateSettings"]),
    formSubmit() {
      this.isFormSubmitted = true;
      setTimeout(() => (this.isFormSubmitted = false), 2500);
      if (this.$v.$invalid) return;
      const settings = {
        howManyInDefaultTest: this.howManyInDefaultTest
      };
      this.updateSettings(settings);
    }
  }
};
</script>
