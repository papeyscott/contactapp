window.$on = function(target, type,cb){
		target.addEventListener(type,cb,false);
		}


		var CORE = require("./core.js"),
			contactform = require("./contactform.js"),
			contactdirectory = require("./contactdirectory.js"),


	CORE.addModule(contactform.id, contactform);
	CORE.addModule(contactdirectory.id, contactdirectory);

	contactform.init();
	contactdirectory.init();
