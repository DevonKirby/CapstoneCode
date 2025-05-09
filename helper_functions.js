const HelperFunctions = { 

    // Function to display the menu options to the user
    // This function prints the menu to the console
    displayMenu(){
        console.log("\n\n");
        console.log("\t\t\t\tRescue Animal System Menu");
        console.log("[1] Intake a new dog");
        console.log("[2] Intake a new monkey");
        console.log("[3] Reserve an animal");
        console.log("[4] Unreserve an animal");
        console.log("[5] Print a list of all dogs");
        console.log("[6] Print a list of all monkeys");
        console.log("[7] Print a list of all that are not reserved");
        console.log('[8] Add animal to training queue');
        console.log("[9] Train next animal in queue");
        console.log("[q] Quit application");
        console.log();
    }


}

export default HelperFunctions;