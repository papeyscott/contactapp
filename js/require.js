	window.$on = function(target, type,cb){
		target.addEventListener(type,cb,false);
	}

	var a = document.getElementById("handle");

		

var CORE =(function(){
	"use strict";

	//keep track of modules
	var modules = {};

	function addModule(module_id, mod){
		modules[module_id]= mod;
	}

	function registerEvents(evt,module_id){
		modules[module_id].events=evt;
	}

	function triggerEvents(evt){
		var mod;
		for(mod in modules){
			if(modules.hasOwnProperty(mod)){
				mod = modules[mod];
				if(mod.events && mod.events[evt.type]){
					mod.events[evt.type](evt.data);
				}
			}
		}
	}

	return{
		addModule: addModule,
		registerEvents: registerEvents,
		triggerEvents:triggerEvents,
	}
})();
			
			var sb = (function(){
				function listen(evt, module_id){
					CORE.registerEvents(evt,module_id);
				}

				function notify(evt){
					CORE.triggerEvents(evt);
				
				}

				return{
					listen:listen,
					notify:notify
				}

			})();

			var addContact = (function()	{
				var id, input, handle, info;

				id = "add-contact";


				function init(){
					input = document.getElementsByTagName("input");
					handle = input[2];

				
					$on(handle, "click", contact);
				}

				/*function action(){
					return  num = 0;
						    name = "";
				}*/

				function contact(e){

					info = {
						name: input[0].value,
						phone: input[1].value
					}

					sb.notify({
						type:"notify-board",
						data:info
					});
					e.preventDefault();
				}

				return{
					id:id,
					init:init,
					contact:contact
				}

			})();


			var display =(function(){
				var id, show;

				function init(){
					show = document.getElementById("contacts");
					var ul = document.getElementById("contact-list");
					
					sb.listen({
						"notify-board":refreshBoard
					}, id);
				}

				function refreshBoard(add){
					
					  var li=document.createElement("li");
					  var h4=document.createElement("h4");
					  var p =document.createElement("p");
					  var br =document.createElement("br")

					  var h4text =document.createTextNode(add.name);
					  var ptext = document.createTextNode(add.phone);
					  
					   
					   p.appendChild(ptext);
					   h4.appendChild(h4text);
					   
					   li.appendChild(h4);
					   ul.appendChild(li);
					   li.appendChild(p);
					   ul.appendChild(li);
					   li.appendChild(br);
					   ul.appendChild(li);

					   show.innerHTML = "";
					   show.appendChild(p),
					   show.appendChild(h4);
				}
				return{
					id:id,
					init:init,
					refreshBoard:refreshBoard
				}
			})();

			CORE.addModule(display.id,display);
			CORE.addModule(addContact.id,addContact);

			display.init();
			addContact.init();


