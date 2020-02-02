const Learn = () => import("./../views/Learn");
const AddQuestion = () => import("./../views/AddQuestion");
const EditQuestion = () => import("./../views/EditQuestion");
// components as views
const QuestionInTest = () => import("./../components/question/QuestionInTest");
const QuestionForm = () => import("./../components/question/QuestionForm");
const QuestionList = () => import("./../components/question/QuestionList");

import { redirectIfNoWithNoParams } from "./../utils/routeHelpers";

export default [
  {
    path: "/question",
    name: "Learn",
    component: Learn,
    meta: { requiresAuth: true, requiresFreshQuestions: true },
    children: [
      {
        path: "list",
        // alias "" for making on main route available
        alias: "",
        name: "LearnQuestionList",
        component: QuestionList,
        props: {
          isListItemActive: true
        }
      },
      {
        path: "single",
        name: "LearnSingleQuestion",
        beforeEnter: redirectIfNoWithNoParams,
        component: QuestionInTest,
        props: true
      }
    ]
  },
  {
    path: "/add-question",
    name: "AddQuestion",
    component: AddQuestion,
    meta: { requiresAuth: true }
  },
  {
    path: "/edit-question",
    component: EditQuestion,
    meta: { requiresAuth: true, requiresFreshQuestions: true },
    children: [
      {
        path: "list",
        alias: "",
        name: "EditQuestionList",
        component: QuestionList,
        props: {
          hasCrudIcons: true
        }
      },
      {
        path: "form",
        name: "EditQuestionForm",
        beforeEnter: redirectIfNoWithNoParams,
        component: QuestionForm,
        props: true
      }
    ]
  }
];
