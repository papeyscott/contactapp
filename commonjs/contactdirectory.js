	var sb = require("./sandbox.js");
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

	
		module.exports.id=id;
		module.exports.init=init;
		module.exports.addListing=addListing;
		module.exports.closeDirectory=closeDirectory;
	