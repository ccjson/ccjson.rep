
const LIB = require("bash.origin.workspace").forPackage(__dirname).LIB;
const CCJSON = LIB.CCJSON();

exports.forConfig = function (CONFIG) {

    // TODO: Relocate to 'origin' abstraction
    if (!CONFIG.o) {
        throw new Error("Origin (o) config not set!");
    }
    var origin = CONFIG.o;
    delete CONFIG.o;
    if (!origin.basedir) {
        throw new Error("'basedir' not declared in origin config!");
    }
    var configPath = LIB.PATH.join(
        origin.basedir,
        // TODO: Derive ID based on some kind of context ID instead of code which changes.
        "~.rt_org.ccjson.rep_src_" + LIB.CRYPTO.createHash('sha1').update(JSON.stringify(origin) + JSON.stringify(CONFIG)).digest('hex') + ".js"
    );
    // TODO: Make async.
    LIB.FS.writeFileSync(configPath, JSON.stringify(CONFIG, null, 4), "utf8");

    return {
        "#io.pinf/middleware~s1": function (API) {

            function ensureMounted () {
                if (!ensureMounted._promise) {
                    var ccjson = new CCJSON();
                    ensureMounted._promise = ccjson.parseFile(configPath, {
                        on: {
                            fileNotFound: function (path, optional) {
    
                                var path = LIB.BASH_ORIGIN.resolve(path);

                                return path + "/_#_org.bashorigin_#_" + path.$id.api + ".ccjson";
                            },
                            loadEntityImplementation: function (path) {
    
                                // TODO: Do not cache module so we can reload it.
                                var rep = LIB.CODEBLOCK.require(require.resolve(path));
    
                                if (rep["#ccjson-entity-rep1"]) {
    
                                    // TODO: Load entity by loading path twice (once for compile and
                                    //       one for render). Use browserify for render code
                                    //       so that all dependencies get inlined.
    
                                    rep = require("./src/ccjson-entity-rep1")({
                                        LIB: LIB
                                    })(rep["#ccjson-entity-rep1"]);
                                }
                                return rep;
                            }
                        }
                    }).then(function (config) {

                        var rootInstance = new config({}).toString().getInstance(origin.rootInstance);

                        return rootInstance.forConfig({
                            variables: CONFIG.variables
                        })["#io.pinf/middleware~s1"](API);
                    });
                }
                return ensureMounted._promise;
            }

            return function (req, res, next) {

                return ensureMounted().then(function (app) {

                    return app(req, res, next);
                }).catch(next);
            };
        }
    }
}
