		window.$on = function(target, type,cb){
		target.addEventListener(type,cb,false);
		}


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


		var contactForm = (function(){
			var el, name, phone, add, id;   //the el is the main wrapper i.e the form id in this context
										//name phone and add in this context is the input field
			id = "add-contact";

			function init(){
				el = document.getElementById("add-contact");
				name = document.getElementsByClassName("contact-name")[0];//this is each input field it is called explicitly
				phone = document.getElementsByClassName("phone-number")[0];
				add = document.getElementsByClassName("submit")[0];

				
				
				//register event handlers
				$on(add, "click", addContacts);

				sb.listen({"show-up":displayForm},id)
			}


			function addContacts(e){
				var contactDetails = {};

				contactDetails.username = name.value;
				contactDetails.userphone = phone.value;

				sb.notify({
					type: "add-contact",
					data: contactDetails
				});
				el.reset();

				el.classList.toggle("module-active");
				e.preventDefault();
			}

			function displayForm(){
				el.classList.toggle("module-active");
			}

			return{
				id:id,
				addContacts:addContacts,
				init:init,
				displayForm:displayForm
			}

		})();


		var contactDirectory = (function(){
			var el, list, add;

			id="contacts";

			function init(){
				el= document.getElementById("contacts");
				list = document.getElementById("contact-list");
				add = document.getElementsByClassName("add-contact")[0];

				sb.listen({"add-contact" : addListing}, id);

				$on(add, "click",closeDirectory);
			}

			function addListing(contact){
				var li =  document.createElement("li");
				
				var name = document.createElement("p");
				var nameNodeVal = document.createTextNode(contact.username);
				name.appendChild(nameNodeVal);


				var phone = document.createElement("p");
				var phoneNodeVal = document.createTextNode(contact.userphone);
				phone.appendChild(phoneNodeVal);
			
				li.appendChild(name);
				li.appendChild(phone);

				list.appendChild(li);

				el.classList.toggle("module-active");
			}

			function closeDirectory(e){
					sb.notify({
						type:"show-up",
						data:null
					});

					el.classList.toggle("module-active");
					e.preventDefault();
			}

			return{
				id:id,
				init:init,
				addListing:addListing,
				closeDirectory:closeDirectory
			}
		})();

		CORE.addModule(contactForm.id, contactForm);
		CORE.addModule(contactDirectory.id, contactDirectory);

		contactForm.init();
		contactDirectory.init();
