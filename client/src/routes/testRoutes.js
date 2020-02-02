const Test = () => import("./../views/Test");
const EditTest = () => import("./../views/EditTest");
const TestList = () => import("./../components/test/TestList");
const TestForm = () => import("./../components/test/TestForm");

import { redirectIfNoWithNoParams } from "./../utils/routeHelpers";

export default [
  {
    path: "/test",
    name: "Test",
    component: Test,
    meta: {
      requiresAuth: true,
      requiresFreshTests: true,
      requiresFreshQuestions: true
    }
  },
  {
    path: "/edit-test",
    component: EditTest,
    meta: {
      requiresAuth: true,
      requiresFreshTests: true,
      requiresFreshQuestions: true
    },
    children: [
      {
        path: "list",
        alias: "",
        name: "TestList",
        component: TestList
      },
      {
        path: "edit",
        name: "EditTestForm",
        beforeEnter: redirectIfNoWithNoParams,
        component: TestForm,
        props: true
      },
      {
        path: "add",
        name: "AddTestForm",
        component: TestForm
      }
    ]
  }
];
