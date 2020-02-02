<template functional>
  <v-navigation-drawer :value="props.isDrawerOpen" temporary app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Vue Test App
        </v-list-item-title>
        <v-list-item-subtitle>
          Choose your action
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item to="/question" link>
        <v-list-item-icon>
          <v-icon class="pa-2">question_answer</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          Learn
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/add-question" link>
        <v-list-item-icon>
          <v-icon class="pa-2">note_add</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          Add question
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/edit-question" link>
        <v-list-item-icon>
          <v-icon class="pa-2">edit</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          Edit Question
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/test" link>
        <v-list-item-icon>
          <v-icon class="pa-2">fitness_center</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          Test yourself!
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/edit-test" link>
        <v-list-item-icon>
          <v-icon class="pa-2">check</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          Manage tests
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/setttings" link>
        <v-list-item-icon>
          <v-icon class="pa-2">settings</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          Settings
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
