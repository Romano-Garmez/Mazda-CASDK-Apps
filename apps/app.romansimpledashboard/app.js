/**
 * Custom Applications SDK for Mazda Connect Infotainment System
 *
 * A mini framework that allows to write custom applications for the Mazda Connect Infotainment System
 * that includes an easy to use abstraction layer to the JCI system.
 *
 * Written by Andreas Schwarz (http://github.com/flyandi/mazda-custom-applications-sdk)
 * Copyright (c) 2016. All rights reserved.
 *
 * WARNING: The installation of this application requires modifications to your Mazda Connect system.
 * If you don't feel comfortable performing these changes, ple
ase do not attempt to install this. You might
 * be ending up with an unusuable system that requires reset by your Dealer. You were warned!
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the
 * GNU General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
 * License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see http://www.gnu.org/licenses/
 *
 */

/**
 * SimpleDashboard Example Applicatiom
 *
 * This is a tutorial example application showing a simple Dashboard that allows cycling
 * between Vehicle values using the Multicontroller.
 *
 */


CustomApplicationsHandler.register("app.romansimpledashboard", new CustomApplication({

    /**
     * (require)
     *
     * An object array that defines resources to be loaded such as javascript's, css's, images, etc
     *
     * All resources are relative to the applications root path
     */

    require: {

        /**
         * (js) defines javascript includes
         */

        js: [],

        /**
         * (css) defines css includes
         */

        css: ['app.css'],

        /**
         * (images) defines images that are being preloaded
         *
         * Images are assigned to an id
         */

        images: {},

    },

    /**
     * (settings)
     *
     * An object that defines application settings
     */

    settings: {

        /**
         * (terminateOnLost)
         *
         * If set to 'true' this will remove the stateless life cycle and always
         * recreate the application once the focus is lost. Otherwise by default
         * the inital created state will stay alive across the systems runtime.
         *
         * Default is false or not set
         * /

        // terminateOnLost: false,

        /**
         * (title) The title of the application in the Application menu
         */

        title: 'Fuel Consumption Dashboard',

        /**
         * (statusbar) Defines if the statusbar should be shown
         */

        statusbar: true,

        /**
         * (statusbarIcon) defines the status bar icon
         *
         * Set to true to display the default icon app.png or set a string to display
         * a fully custom icon.
         *
         * Icons need to be 37x37
         */

        statusbarIcon: true,

        /**
         * (statusbarTitle) overrides the statusbar title, otherwise title is used
         */

        statusbarTitle: false,


        /**
         * (hasLeftButton) indicates if the UI left button / return button should be shown
         */

        hasLeftButton: false,

        /**
         * (hasMenuCaret) indicates if the menu item should be displayed with an caret
         */

        hasMenuCaret: false,

        /**
         * (hasRightArc) indicates if the standard right car should be displayed
         */

        hasRightArc: false,
    },



    /***
     *** User Interface Life Cycles
     ***/

    /**
     * (created)
     *
     * Executed when the application gets initialized
     *
     * Add any content that will be static here
     */

    created: function () {

        // let's build our interface

        // 1) create a value label that shows the current value of the selected section

        this.valueLabel = $("<div/>").appendTo(this.canvas);

        // 2) create a name label that shows the name of the selected section

        this.unitLabel = $("<span id=\"unitLabel\"/>").appendTo(this.canvas);

        this.nameLabel = $("<span/>").appendTo(this.canvas);


        // now let's get our data in place

        // 1) create our sections by calling our application specific method
        this.createSections();

        // 2) Finally show the first section
        this.showSection(0);

    },


    /***
     *** Events
     ***/

    /**
     * (event) onControllerEvent
     *
     * Called when a new (multi)controller event is available
     */

    onControllerEvent: function (eventId) {

        // For this application we are looking at the wheel
        // and the buttons left and right
        switch (eventId) {

            /**
             * Go forward in displaying our sections
             */

            case "cw":
            case "rightStart":

                // we just cyle the sections here

                this.currentSectionIndex++;
                if (this.currentSectionIndex >= this.sections.length) this.currentSectionIndex = 0;

                this.showSection(this.currentSectionIndex);

                break;

            /**
             * Go backwards in displaying our sections
             */

            case "ccw":
            case "leftStart":

                // we just cyle the sections here

                this.currentSectionIndex--;
                if (this.currentSectionIndex < 0) this.currentSectionIndex = this.sections.length - 1;

                this.showSection(this.currentSectionIndex);

                break;
        }
    },


    /***
     *** Applicaton specific methods
     ***/

    /**
     * (createSections)
     *
     * This method registers all the sections we want to display
     */

    createSections: function () {

        // Here we define our sections

        this.sections = [

            // Default MPG units
            { name: 'Average Fuel Consumption', unit: 'MPG', lengthPerMile: 1, volumePerGallon: 1},

            // Bigs 107.3 fluid oz
            // 1.19291705499 bigs per gallon
            // 7.99998 furlongs per miles
            { name: 'Average Bigs Consumption', unit: 'Bigs per Furlong' , lengthPerMile: 7.99998, volumePerGallon: 1.19291705499},

            // 320 rods per mile

            { name: 'Average Kilobigs Consumption', unit: 'Kilobigs per Rod' , lengthPerMile: 320, volumePerGallon: 1192.91705499},
        
            // barrel is 42 gallons
            // 17.6 football fields per mile
            { name: 'Average Barrels Consumption', unit: 'Barrels per Football Field' , lengthPerMile: 17.6, volumePerGallon: 42},
        
            // 85.3333333 shots per gallon
            // horse length is 8 feet
            // 660 horse lengths per mile
            { name: 'Average Shots Consumption', unit: 'Shots per Horse Length' , lengthPerMile: 660, volumePerGallon: 85.3333333},

            // 1/660000 olymic swimming pools per gallon
            // 1/3959 earth radius per mile
            { name: 'Average Pool Consumption', unit: 'Olymic Pools per Earth Radius' , lengthPerMile: 0.00025258903, volumePerGallon: 0.00000151515},
        ];

        // let's actually execute the subscriptions

        this.sections.forEach(function (section, sectionIndex) {

            this.subscribe(VehicleData.fuel.averageconsumption, function (value) {

                // we got a new value for this subscription, let's update it
                for (section in this.sections) {
                    this.updateSection(section, value);
                }

            }.bind(this));

        }.bind(this));

    },

    /**
     * (showSection)
     *
     * This method shows a section specific value / name
     */

    showSection: function (sectionIndex) {

        // just in case, let's do some sanity check
        if (!this.sections || sectionIndex < 0 || sectionIndex >= this.sections.length) return false;

        // let's store the current section in a local variable
        var section = this.sections[sectionIndex],

            // Let's get also the value and name
            value = Math.round((section.value * section.lengthPerMile / section.volumePerGallon) * 100) / 100  || 0;
            name = section.name;
            unit = section.unit;


        // Let's check if this value requires some transformation.
        // We are using the internal is handler to determinate

        if (this.is.fn(section.transform)) {

            // execute the transform
            var result = section.transform(section.value, sectionIndex);

            // set the updated value
            value = result.value || 0;

            // also set the name if necessary
            name = result.name || name;

            unit = result.unit || unit;

            lengthPerMile = result.lengthPerMile || lengthPerMile;

            volumePerGallon = result.volumePerGallon || volumePerGallon;
        }

        // now let's set the sections value
        this.valueLabel.html(value);

        // and the name
        this.nameLabel.html(name);

        this.unitLabel.html(unit);

        // finally let's update the current section index
        this.currentSectionIndex = sectionIndex;
    },

    /**
     * (updateSection)
     *
     * This method updates a value and also updates the display if necessary
     */

    updateSection: function (sectionIndex, value) {

        // just in case, let's do some sanity check
        if (sectionIndex < 0 || sectionIndex >= this.sections.length) return false;

        // let's update the sections value
        this.sections[sectionIndex].value = value;

        // and finally, update the display if required
        if (sectionIndex == this.currentSectionIndex) {
            this.showSection(this.currentSectionIndex);
        }
    },


}));
