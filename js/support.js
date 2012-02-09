
var WizH5F = WizH5F || {
    version: "0.2.0",
    fields: {}
};

WizH5F.Support = function() {
    var nativeInput = document.createElement('input');
    return {
        hasTypeSupport: function(type) {
            nativeInput.setAttribute('type', type);
            return nativeInput.type == type;
        },
        hasAttributeSupport: function(attr) {
            return (attr in nativeInput);
        }
    };
}();