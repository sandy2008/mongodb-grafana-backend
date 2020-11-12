"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongoDBConfigCtrl = exports.MongoDBConfigCtrl = function () {
  function MongoDBConfigCtrl($scope) {
    _classCallCheck(this, MongoDBConfigCtrl);

    this.current.jsonData = this.current.jsonData || {};
    this.current.jsonData.mongodb_url = this.current.jsonData.mongodb_url || "mongodb://localhost:27017";
    this.current.jsonData.mongodb_db = this.current.jsonData.mongodb_db || "";
    this.current.jsonData.stages = this.current.jsonData.stages || [];
  }

  _createClass(MongoDBConfigCtrl, [{
    key: "removeStage",
    value: function removeStage(map) {
      var index = _.indexOf(this.current.jsonData.stages, map);
      this.current.jsonData.stages.splice(index, 1);
      this.render();
    }
  }, {
    key: "addStage",
    value: function addStage() {
      this.current.jsonData.stages.push({ name: '', stage: '' });
    }
  }]);

  return MongoDBConfigCtrl;
}();

MongoDBConfigCtrl.templateUrl = 'partials/config.html';
//# sourceMappingURL=config_ctrl.js.map
