window.$on = function(target, type,cb){
		target.addEventListener(type,cb,false);
		}

define(["./core", "./contactform", "./contactdirectory"], function(CORE, contactdirectory, contactform){
	CORE.addModule(contactform.id, contactform);
	CORE.addModule(contactdirectory.id, contactdirectory);

	contactform.init();
	contactdirectory.init();
})