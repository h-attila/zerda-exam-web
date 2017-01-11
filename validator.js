module.exports = {

  // valid email
  emailOk: function (email) {
    var result = false;
    if (email.indexOf('@') >= 0) {
      result = true;
    }
    console.log('email:' +  result);
    return result;
  },

  // scale validator
  scaleOk: function (scale) {
    var result = false;
    if (scale >=10) {
      result = true;
    }
    console.log('scale:' +  result);
    return result;
  },

  feedbackOk: function (feedback) {
    var validWords = ["amazing", "awesome", "blithesome", "excellent", "fabulous", "fantastic", "favorable", "fortuitous", "great", "incredible", "ineffable", "mirthful", "outstanding", "perfect", "propitious", "remarkable", "smart", "spectacular", "splendid", "stellar", "stupendous", "super", "ultimate", "unbelievable", "wondrous"];

    var feedbackArr = feedback.split(' ');
    var goodWords = 0;
    var result = false;

    feedbackArr.forEach(function(feedItem){
      if (validWords.indexOf(feedItem)>=0){
        goodWords++;
      };
    });

    if (goodWords >= 3) { result = true };

    console.log('feedback:' +  result);
    return result;
  }
};
