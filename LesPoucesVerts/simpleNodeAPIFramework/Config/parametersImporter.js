module.exports = function () {
    //merge parameters and parameters default with priority on parameters
    parameters = require("./parameters");
    parameters_default = require("./parameters_default");
    
    //surcharge de parametrs_default (non récursive)
    for (var paramName in parameters) {
        if (parameters_default.hasOwnProperty(paramName)) {
            parameters_default[paramName] = parameters[paramName];
        }
    }

    return parameters_default;
}