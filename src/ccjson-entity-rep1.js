
module.exports = function (context) {

    return function (rep) {

        return {
            forLib: function (LIB) {

                return LIB.Promise.resolve({
                    forConfig: function (defaultConfig) {

                        var CcjsonEntityRep = function (instanceConfig) {

                            var self = this;
                            var config = {};
                            LIB._.merge(config, defaultConfig)
                            LIB._.merge(config, instanceConfig)
                            delete config["$alias"];

                            self.reps = {};

                            self.AspectInstance = function (aspectConfig) {

                                var node = {};
                                LIB._.merge(node, config)
                                LIB._.merge(node, aspectConfig)

                                return LIB.Promise.try(function () {
                                    if (!rep.compile) {
                                        return node;
                                    }
                                    return rep.compile(node);
                                }).then(function (node) {

                                    var codeblock = context.LIB.CODEBLOCK.thawFromJSON(rep.render(node, context.LIB.CODEBLOCK.Codeblock)).compile(node);
                                    self.reps[instanceConfig.$alias] = codeblock;
                                    // We remove all variables from the client that are compiled into the rep on the server.
                                    codeblock._args.forEach(function (name) {
                                        delete node[name];
                                    });

                                    return {
                                        inject: function () {

                                            return LIB.Promise.resolve({
                                                alias: instanceConfig.$alias,
                                                reps: self.reps,
                                                node: node
                                            });
                                        }
                                    };
                                });
                            }
                        }
                        CcjsonEntityRep.prototype.config = defaultConfig;
            
                        return CcjsonEntityRep;
                    }
                });
            }
        };
    };
}
