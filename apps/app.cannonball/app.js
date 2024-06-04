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



CustomApplicationsHandler.register("app.cannonball", new CustomApplication({

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

        js: ['timer.js'],

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

        title: 'Cannonball Run Timer',

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


    /**
     * (regions)
     *
     * A object that allows us to manage the different regions
     */

    regions: {

        /**
         * North America (na)
         */

        na: {
            unit: 'MPH',
            transform: DataTransform.toMPH,
        },

        /**
         * Europe (eu)
         */

        eu: {
            unit: 'KM/H',
            transform: false
        },
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

        this.valueLabel = $("<div id=\"speedbox\"/>").appendTo(this.canvas);

        // 2) create a name label that shows the name of the selected section

        this.nameLabel = $("<span/>").appendTo(this.canvas);

        this.timingLabel = $("<div id=\"timingbox\"/>").appendTo(this.canvas);

        this.timingLabel.html("0 seconds");

        this.rpmLabel = $("<div id=\"RPMbox\"/>").appendTo(this.canvas);

        this.rpmLabel.html("0 RPM");

        this.avgSpeedLabel = $("<div id=\"AVGSpeedbox\"/>").appendTo(this.canvas);

        this.avgSpeedLabel.html("60 AVG MPH");

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

            case "cw":
            case "rightStart":

                this.setRegion(this.getRegion() == "na" ? "eu" : "na");

                break;

            case "ccw":
            case "leftStart":

                this.setRegion(this.getRegion() == "na" ? "eu" : "na");

                break;

            case "selectStart":
                this.endTimer();
                this.timingLabel.html("0 seconds");
                break;
        }

    },

    /**
 * (event) onRegionChange
 *
 * Called when the region is changed
 */

    onRegionChange: function (region) {

        // let's just refresh our current section
        this.showSection(this.currentSectionIndex);

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

            // Vehicle speed
            {
                field: VehicleData.vehicle.speed, transform: function (speed, index) {

                    // For speed we need to transform it to the local region
                    if (this.regions[this.getRegion()].transform) {
                        speed = this.regions[this.getRegion()].transform(speed);
                    }

                    // return the new value and name
                    return {
                        value: speed,
                        name: this.regions[this.getRegion()].unit
                    };

                }.bind(this)
            },

            // Vehicle RPM
            { field: VehicleData.vehicle.rpm, name: 'RPM' },

        ];

        // let's actually execute the subscriptions
        this.sections.forEach(function (section, sectionIndex) {

            this.subscribe(section.field, function (value) {

                // we got a new value for this subscription, let's update it
                this.updateSection(sectionIndex, value);

            }.bind(this));

        }.bind(this));

    },

    /**
     * (showSection)
     *
     * This method shows a section specific value / name
     */

    showSection: function () {
        // now let's set the sections value

        // Let's check if this value requires some transformation.
        // We are using the internal is handler to determinate

        // let's store the current section in a local variable
        var carSpeed = this.sections[0];

        //convert speed to MPH/KMH as needed

        if (this.is.fn(carSpeed.transform)) {

            // execute the transform
            var result = carSpeed.transform(carSpeed.value, 0);

            // set the updated value
            speed = result.value || 0;
        }

        //update speed on display
        this.valueLabel.html(speed);

        //check if timer should be started or stopped
        if (carSpeed.value == 0) {
            stopTimer();
        }

        if (isTimerRunning() == false) {
            if (carSpeed.value != 0 && carSpeed.value < 99) {
                startTimer();
            }
        }

        if (isTimerRunning() == true) {
            if (carSpeed.value > 99) {
                this.endTimer();
            }
        }

        // update name on display
        this.nameLabel.html(this.regions[this.getRegion()].unit);

        //update RPM label on display
        this.rpmLabel.html(this.sections[1].value + " RPM");

    },

    /**
     * (updateSection)
     *
     * This method updates a value and also updates the display if necessary
     */

    updateSection: function (sectionIndex, value) {

        // let's update the sections value
        this.sections[sectionIndex].value = value;

        // and finally, update the display if required

        this.showSection();

    },

    //end timer, display time
    endTimer: function () {
        accelTime = stopTimer(); //in ms
        console.log(accelTime);

        secondsTime = accelTime / 1000;
        this.timingLabel.html(secondsTime + " seconds");
    }

}));
