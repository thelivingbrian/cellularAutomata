# Overview
This Cellular Automata is a slight variation on the classic game of life.

Cells have 3 internal boolean states R, G, and B - The evolution ruleset has cells "die" to their inverse. 

The regular conway's game of life is a subset where all cells have the property R == G == B. "Conway like" structures can be observed in certain situations. Dichromatic and Monochromatic cells have distinct behavior. intoducing too many colors produces expanding chaos.

# Build / Run 
To play you have two options: 
- Run the included go server (after "ng build"-ing)
- "ng serve" from within ./grid-app  
