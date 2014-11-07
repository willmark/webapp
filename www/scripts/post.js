define(['scripts/ajax'] , function(ajax) {
    var process = {
        send: function(url, parms, callback) {
            ajax(url, function(response) {
                callback(response);
            }, JSON.stringify(parms), callback); 
        },
        form: function(form) {
            var parms = {}
            for (idx in form) {
                if (+idx+'' !== idx) continue
                switch (form[idx].tagName) {
                    case 'INPUT':
                    case 'TEXTAREA':
                        parms[form[idx].name] = form[idx].value
                } 
            }
            return parms; 
        }
    };
    return process;
});
