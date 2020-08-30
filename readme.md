# Cities quiz game

Main parts of the applications: 
- The `CitiesQuizGame` class, that implements the game logic.
- The `CitiesQuizComponent`, which acts as an interface between the game logic and the actual UI. It handles the map initialization and all other map interactions and updates the `CitiesQuizGame` instance appropriately.
- The `CapitalCitiesService` which loads the cities and their locations as  specified in the `capitalCities.json` file.

## CitiesQuizGame

### Summary
 The game logic is implemented in a separate `CitiesQuizGame` class so that it can be developed and tested independently. A game instance is created with the constructor and initialized using the `init()` method. The instance keeps the current state of the game which can be looked at through certain public methods to see how the game is going and react appropriately on the UI part. The `CitiesQuizGame` is instantiated by passing it all the possible cities. The game is played by invoking the `guess(position: LatLng)` method which will update the current state. The user can use the `hasEnded()` to see if the game has come to a conclusion and the `getHighscores()` method to see the results. The game ends if no more points are left, or if the user has guessed all cities. To start a new game, the user can invoke `init()` on the same game instance.

### Improvement suggestions
- Move `STARTING_POINTS` and `CORRECT_GUESS_LIMIT` to be received through the constructor as properties of a possible `GameOptions` class, together with `CITIES`, so that the game can be more easily customized from the outside. We could also export these options to a `gameConfiguration.json` together with the possible cities.

- Certain state indicators that are used, like the method `hasEnded()`, `getCityToBeGuessed()`, etc. could be turned into corresponding `Subject`s which would be used to inform the user of state changes. That way we would not have to query the state using methods, but would be informed of state changes in a reactive manner. This would optimize the app a little, since methods like `hasEnded()` would NOT need to be evaluated on each `changeDetection` cycle, but rather the change detection would be triggered only when they change.

## CitiesQuizComponent

### Summary

- This component acts as a bridge between what's happening on the map and the game instance that's holding the state of the current game. After the view is initialized `ngAfterViewInit()`, we initialize the map, remove the default labels, add initial markers of all cities (which are hidden by default) and register a click event which we use to update the game state accordingly.

- All cities are shown briefly at the start of the game. The user moves the pin freely and presses the Place Pin button to confirm their choice. The game then enters a transition state, tracked with the `inTransition` property. In this state the correct location of the current city is shown and the user is told wether his location choice was close enough to the target. After the transition the correct location is hidden and the user is asked to find a new, randomly selected, city. The game continues until the user guesses all the cities or uses up all points.

### Possible improvements

- We could separate the map into a dedicated component which would handle the initialization and preparation of the type of map we need. We would then expose public methods which would implement only the behaviours we need for the game (pin placement, changing marker visibility, etc.). We could use this component in the `CitiesQuizComponent` with the `ViewChild` decorator.

- We could also separate the action buttons into a separate component, and expose events using `EventEmitters`.

- We could extract a header component which would show current game information.


## Other points of improvement

- Expand the `capitalCities.json` to be a more general configuration of the game, so that the game can be customized more easily.
- Write unit tests to test the game logic.
- Break out the code into more appropriately named methods.
- Write Angular documentation (summaries) for methods whose behaviour is still somewhat unclear.
- Comment portions of the code that are unclear, but could not be extracted into meaningfully named methods. 


