    
exports["#ccjson-entity-rep1"] = {
    compile: function (node) {

        node.tpl = [
            '<div>',
            node.framing[0],
            '%message%',
            node.framing[1],
            '</div>'
        ].join("");
        delete node.framing;

        return node;
    },
    render: (javascript (tpl, punktuation) >>>

        const WINDOW = window;

        exports.main = function (JSONREP, node) {

            var html = "%%%tpl%%%".replace(/%message%/, node.message + "%%%punktuation%%%");

            return JSONREP.makeRep(html, {
                on: {
                    mount: function (el) {
        
                    }
                }
            });
        };
    <<<)
}
