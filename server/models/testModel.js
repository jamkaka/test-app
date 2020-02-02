const mongoose = require("mongoose");

const testSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    questions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Question"
      }
    ],
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    isForkable: {
      type: Boolean,
      default: false
    },
    isForked: {
      type: Boolean,
      default: false
    }
  },
  { toJSON: { virtuals: true } }
);

testSchema.set("timestamps", true);

testSchema.virtual("questionsLength").get(function() {
  // virtual properties apply to the queried document. so if query sth witout 'questions' selected, this will throw an error!
  if (this.questions) return this.questions.length;
});

// testSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: "questions",
//     select: "title correctAnswer answers"
//   });
//   next();
// });

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
