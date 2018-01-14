var config = require('./config');
var nodeMariaDb = require('mysql');
var fs = require('fs')

function dataAccessLayerX() {
    var connection = null;
}

dataAccessLayerX.prototype.getConnection = function() {
    var self = this;
    self.connection = nodeMariaDb.createConnection({
        host : config.databasehost,
        port : config.databaseport,
        user : config.databaseusername,
        password : config.databasepassword,
        database : config.database,
        ssl : {
            ca : fs.readFileSync(config.cert)
        }
    });
};

dataAccessLayerX.prototype.openConnection = function(cb) { 
    var self = this;
    self.getConnection();
    self.connection.connect(null, cb);
};

dataAccessLayerX.prototype.closeConnection = function() { 
    var self = this;
    self.connection.end();
};

dataAccessLayerX.prototype.escape = function(value) { 
    var self = this;
    return self.connection.escape(value);
}

dataAccessLayerX.prototype.startTransaction = function(cb) { 
    var self = this;
    self.executeStatement('START TRANSACTION', cb);
};

dataAccessLayerX.prototype.rollbackTransaction = function(cb) { 
    var self = this;
    self.executeStatement('ROLLBACK', cb);
};

dataAccessLayerX.prototype.commitTransaction = function(cb) { 
    var self = this;
    self.executeStatement('COMMIT', cb);
};

dataAccessLayerX.prototype.executeStatement = function(sqlStatement, cb) { 
    var self = this;
    self.connection.query(sqlStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.executeQuery = function(sqlQueryStatement, cb) { 
    var self = this;
    self.connection.query(sqlQueryStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};


dataAccessLayerX.prototype.addModuleView = function(ModuleView, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO moduleviews (';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'Occurred';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    ModuleView.SecurityUserID,
    ModuleView.Name,
    ModuleView.Occurred];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyModuleView = function(ModuleView, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE moduleviews ';
    sqlUpdateStatement += ' SET SecurityUserID = ?, ';
    sqlUpdateStatement += ' Name = ?, ';
    sqlUpdateStatement += ' Occurred = ?';
   sqlUpdateStatement += ' WHERE ModuleViewID = ?'; 
    var dataValues = [
    ModuleView.SecurityUserID,
    ModuleView.Name,
    ModuleView.Occurred,
    ModuleView.ModuleViewID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardModuleView = function(ModuleView, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM moduleviews WHERE ModuleViewID = ?';
    var dataValues = [
    ModuleView.ModuleViewID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftModuleView = function(ModuleView, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE moduleviews SET IsDeleted = 1 WHERE ModuleViewID = ?';
    var dataValues = [
    ModuleView.ModuleViewID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllModuleView = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM moduleviews';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseModuleView = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM moduleviews WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addSecurityUser = function(SecurityUser, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO securityusers (';
    sqlInsertStatement += 'ExternalSecurityUserID, ';
    sqlInsertStatement += 'SubUserOfSecurityUserID';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    SecurityUser.ExternalSecurityUserID,
    SecurityUser.SubUserOfSecurityUserID];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifySecurityUser = function(SecurityUser, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE securityusers ';
    sqlUpdateStatement += ' SET ExternalSecurityUserID = ?, ';
    sqlUpdateStatement += ' SubUserOfSecurityUserID = ?';
   sqlUpdateStatement += ' WHERE SecurityUserID = ?'; 
    var dataValues = [
    SecurityUser.ExternalSecurityUserID,
    SecurityUser.SubUserOfSecurityUserID,
    SecurityUser.SecurityUserID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardSecurityUser = function(SecurityUser, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM securityusers WHERE SecurityUserID = ?';
    var dataValues = [
    SecurityUser.SecurityUserID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftSecurityUser = function(SecurityUser, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE securityusers SET IsDeleted = 1 WHERE SecurityUserID = ?';
    var dataValues = [
    SecurityUser.SecurityUserID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllSecurityUser = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM securityusers';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseSecurityUser = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM securityusers WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

module.exports.dataAccessLayerX = dataAccessLayerX;