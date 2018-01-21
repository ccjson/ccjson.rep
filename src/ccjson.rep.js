
const WINDOW = window;

exports.main = function (JSONREP, node) {

    return JSONREP.makeRep('<div>CCJSON</div>', {
        on: {
            mount: function (el) {

            }
        }
    });
};
