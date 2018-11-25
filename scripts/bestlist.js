import request from 'superagent';

Vue.component("nice-thing", {
	props: ['thing'],
	template: '<li><span type="text" style="margin-right: 1em">{{ thing.text }}</span><button style="border-radius: 50%;" v-on:click="$emit(\'remove\')">X</button></li>'
})

var listApp = new Vue( {
	el: '#list',
	data: {
		things: [],
		newthing: '',
		errortext: ''
	},
	mounted() {
		request
	   .get('/retrieveThings')
	   .then(res => {
	      console.log(res.body);
	      for(var i = 0; i < res.body.length; i++) {
	      	var id = this.things.length === 0 ? 0 : this.things[this.things.length-1].id + 1;
				this.things.push({
					id: id,
					text: res.body[i].name
				});
	      }
	   })
	   .catch(err => {
	      console.log("Error retrieving things " + err.message);
   });
	},
	methods: { 
		addThing: function(){
			var testResult = this.checkThing(this.newthing);
			if(testResult === true) {
				var id = this.things.length === 0 ? 0 : this.things[this.things.length-1].id + 1;
				this.things.push({
					id: id,
					text: this.newthing
				});

				request
				.post("/addThing")
				.type('json')
				.send({ thing: this.newthing })
				.then(
				      function(error) {
				        console.log("we have error", error);
				    },
				      function(ok) {
				        console.log("We have ok", ok);
				    }
				);

				this.newthing = "";
				this.errortext= "";
			}
			else {
				this.errortext = "Juttu saa olla 20 merkkiä pitkä ja sisältää vain kirjaimia, numeroita, pisteitä ja pilkkuja!";
			}
		},
		removeThing: function(id){	
			var index;		
			var rmThing;
			for (var i = 0; i < this.things.length; i++) {
				if(this.things[i].id === id) {
					index = i;
					break;
				}
			}
			rmThing = this.things[index].text;
			this.things.splice(index,1);

			request
			.post("/removeThing")
			.type('json')
			.send({ thing: rmThing })
			.then(
			      function(error) {
			        console.log("we have error", error);
			    },
			      function(ok) {
			        console.log("We have ok", ok);
			    }
			);
		},
		checkThing: function(thing) {
			var regex = RegExp("^[A-za-z1-9.,\\s]{1,20}$");
			return regex.test(thing);
		}
	}
})
