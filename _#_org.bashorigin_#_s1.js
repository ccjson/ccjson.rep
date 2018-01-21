
const LIB = require("bash.origin.workspace").forPackage(__dirname).LIB;

const PATH = LIB.PATH;
const FS = LIB.FS_EXTRA;
const CODEBLOCK = LIB.CODEBLOCK;
const BO = LIB.BASH_ORIGIN;


const CCJSON = require("ccjson");


exports.forConfig = function (CONFIG) {


    return {
        "#io.pinf/middleware~s1": function (API) {

            return function (req, res, next) {

console.log("CCJSON", CCJSON);                
                
console.log("CONFIG", CONFIG);                

console.log("Service request ...", req.url);


            };
        }
    }
}
