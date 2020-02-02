import Vue from "vue";
import Vuetify from "vuetify/lib";
import { VCard, VCardTitle, VCardText } from "vuetify/lib"; // for functional CardHeading
import {
  VNavigationDrawer,
  VDivider,
  VIcon,
  VList,
  VListItem,
  VListItemTitle,
  VListItemSubtitle,
  VListItemIcon,
  VListItemContent
} from "vuetify/lib"; // for functional TheMobileMenu

import {} from "vuetify/lib";

Vue.use(Vuetify, {
  components: {
    VCard,
    VCardTitle,
    VCardText,
    VNavigationDrawer,
    VDivider,
    VIcon,
    VList,
    VListItem,
    VListItemTitle,
    VListItemSubtitle,
    VListItemIcon,
    VListItemContent
  }
});

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  }
});
