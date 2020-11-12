'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationsQueryCtrl = exports.QueryOptionsCtrl = exports.ConfigCtrl = exports.QueryCtrl = exports.Datasource = undefined;

var _datasource = require('./datasource');

var _query_ctrl = require('./query_ctrl');

var _config_ctrl = require('./config_ctrl');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongoDBQueryOptionsCtrl = function MongoDBQueryOptionsCtrl() {
  _classCallCheck(this, MongoDBQueryOptionsCtrl);
};

MongoDBQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

var MongoDBAnnotationsQueryCtrl = function MongoDBAnnotationsQueryCtrl() {
  _classCallCheck(this, MongoDBAnnotationsQueryCtrl);
};

MongoDBAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

exports.Datasource = _datasource.MongoDBDatasource;
exports.QueryCtrl = _query_ctrl.MongoDBDatasourceQueryCtrl;
exports.ConfigCtrl = _config_ctrl.MongoDBConfigCtrl;
exports.QueryOptionsCtrl = MongoDBQueryOptionsCtrl;
exports.AnnotationsQueryCtrl = MongoDBAnnotationsQueryCtrl;
//# sourceMappingURL=module.js.map
