var cnt = document.getElementById('add-contact');

cnt.classList.toggle('module-active');

var addContact = (function()	{
		"use strict";
		var num = 0;
		var name = "";

		return{
			setDetails: function(addName,addNum)
			{
				name = addName;
				num = addNum; 
			},

			getName: function()
			{
				return name;
			},

			getNum: function()
			{
				return num;
			}
		}

	})();

var input= document.getElementsByTagName("input");
var addPage = input[2];
addPage.addEventListener("click", function(e)
{
  
  var inputName = input[0].value;
  var inputNum = input[1].value;
  addContact.setDetails(inputName,inputNum);
  var show = document.getElementById("contacts");
  show.classList.toggle("module-active");
  var ul = document.getElementById("contact-list");

  var li=document.createElement("li");
  var h4=document.createElement("h4");
  var p =document.createElement("p");
  var br =document.createElement("br")

  var h4text =document.createTextNode(addContact.getName());
  var ptext = document.createTextNode(addContact.getNum());
  
   
   p.appendChild(ptext);
   h4.appendChild(h4text);
   
   li.appendChild(h4);
   ul.appendChild(li);
   li.appendChild(p);
   ul.appendChild(li);
   li.appendChild(br);
   ul.appendChild(li);

  e.preventDefault();

},false);


var display = document.getElementsByTagName("div");
var showList = display[0];

showList.addEventListener("click", function(e)
{
  
  showList.classList.toggle("module-active");
  

  input[0].value = "";
  input[1].value = "";
  e.preventDefault();

},false);
