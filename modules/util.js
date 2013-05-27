var _ = require('lodash');

exports.minify = function (tweet) {
  'use strict';

  var t = {};
  _.each(['created_at','id_str','text'], function (key) {
    t[key] = tweet[key];
  });

  t.user = {};
  _.each(['name','screen_name','profile_image_url_https'], function(key) {
    t.user.key = tweet.user.key;
  });

  return JSON.stringify(t);
};
