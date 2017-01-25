(function () {
    var old = console.log;
    var logger = document.getElementById('log');
    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += '<p class="_log_o">'+(JSON && JSON.stringify ? JSON.stringify(message) : message) + '</p>';
        } else {
            logger.innerHTML += '<p class="_log_m">'+message + '</p>';
        }
    }
})();

console.log('<span id="_log_h">Debug Console:</span>')