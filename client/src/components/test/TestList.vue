<template>
  <v-card class="pb-5">
    <CardHeading>
      Manage your tests
    </CardHeading>
    <v-divider></v-divider>
    <v-card-text>
      <v-layout align-center>
        <v-flex>
          <p class="ma-0">
            Here you can here you can perform basic CRUD operations on tests!
            Click on <v-icon>question_answer</v-icon> to create test,
            <v-icon>
              edit
            </v-icon>
            to edit test and <v-icon>delete</v-icon> to delete.
          </p>
        </v-flex>
        <v-flex text-right>
          <v-btn @click="$emit('addTest')" color="primary">
            <v-icon class="pr-2">question_answer</v-icon>
            Create a test</v-btn
          >
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-divider></v-divider>
    <v-list>
      <v-list-item-group>
        <template v-for="(test, index) in tests">
          <v-list-item :key="test._id" :ripple="false" inactive>
            <v-icon flat class="pa-2">help</v-icon>
            <v-list-item-content>
              <v-list-item-title v-text="test.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-layout>
                <template>
                  <v-flex>
                    <v-btn @click="$emit('editTest', test._id)" icon>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn @click="$emit('deleteTest', test._id)" icon>
                      <v-icon>
                        delete
                      </v-icon>
                    </v-btn>
                  </v-flex>
                </template>
              </v-layout>
            </v-list-item-action>
          </v-list-item>

          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import CardHeading from "./../generic/CardHeading";

export default {
  name: "TestsList",
  components: {
    CardHeading
  },
  computed: {
    ...mapState("tests", {
      tests: state => state.tests
    })
  }
};
</script>
