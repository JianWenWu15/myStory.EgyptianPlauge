class Start extends Scene {

    create() {
        //Added this in section
        console.log(this.engine.storyData);
        console.log(this.engine.storyData.Credits);
        //console.log(this.engine.storyData.Locations.Kresge.Choices[0].Target);

        // Dynamic data to find the story title
        const key = "Village";
        console.log(this.engine.storyData.Locations[key].Body);

        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {

    
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data

        
        if(locationData.Choices) { // TODO: check if the location has any Choces
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works

            }

            if (key == "River") {
                let oldLocationData = this.engine.storyData.Locations["House"];
                oldLocationData.Choices.push({ Text: "Shovel", Target: "Shovel" }); // Add a new choice to the old location

            }

            if (key == "Shovel" ) {
                let oldLocationData = this.engine.storyData.Locations["River"];
                oldLocationData.Choices.push({ Text: "Shovel", Target: "Water!" });
            }

        } else {
            this.engine.addChoice("To Be Continued.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

//Engine.load(Start, 'myStory.json');
Engine.load(Start, "jianWenStory.json");
