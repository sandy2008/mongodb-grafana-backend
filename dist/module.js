'use strict';

System.register(['./datasource', './query_ctrl', './config_ctrl'], function (_export, _context) {
  "use strict";

  var MongoDBDatasource, MongoDBDatasourceQueryCtrl, MongoDBConfigCtrl, MongoDBQueryOptionsCtrl, MongoDBAnnotationsQueryCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_datasource) {
      MongoDBDatasource = _datasource.MongoDBDatasource;
    }, function (_query_ctrl) {
      MongoDBDatasourceQueryCtrl = _query_ctrl.MongoDBDatasourceQueryCtrl;
    }, function (_config_ctrl) {
      MongoDBConfigCtrl = _config_ctrl.MongoDBConfigCtrl;
    }],
    execute: function () {
      _export('QueryOptionsCtrl', MongoDBQueryOptionsCtrl = function MongoDBQueryOptionsCtrl() {
        _classCallCheck(this, MongoDBQueryOptionsCtrl);
      });

      MongoDBQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

      _export('AnnotationsQueryCtrl', MongoDBAnnotationsQueryCtrl = function MongoDBAnnotationsQueryCtrl() {
        _classCallCheck(this, MongoDBAnnotationsQueryCtrl);
      });

      MongoDBAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

      _export('Datasource', MongoDBDatasource);

      _export('QueryCtrl', MongoDBDatasourceQueryCtrl);

      _export('ConfigCtrl', MongoDBConfigCtrl);

      _export('QueryOptionsCtrl', MongoDBQueryOptionsCtrl);

      _export('AnnotationsQueryCtrl', MongoDBAnnotationsQueryCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
