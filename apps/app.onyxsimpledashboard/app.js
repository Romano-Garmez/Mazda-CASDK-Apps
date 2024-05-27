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
 * onyxsimpledashboard Example Applicatiom
 *
 * This is a tutorial example application showing a simple Dashboard that allows cycling
 * between Vehicle values using the Multicontroller.
 *
 */

// importing codes from module file

//import {test} from 'gpsUtils.js';

CustomApplicationsHandler.register("app.onyxsimpledashboard", new CustomApplication({





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

        js: ['data.js', 'gpsUtils.js'],

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

        title: 'Onyx Simple Dashboard',

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
            unit: 'MPH'
        },

        /**
         * Europe (eu)
         */

        eu: {
            unit: 'KM/H'
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

        // how close you have to be to an establishment for it to count
        this.passedRange = 100
        // how long has to pass before the same establishment can be recorded again
        this.passedTimeout = 120

        this.starbucksPassed = this.get('starbucksPassed')
        this.mcdonaldsPassed = this.get('mcdonaldsPassed')

        if (this.starbucksPassed == null) {
            this.starbucksPassed = 0
        }
        if (this.mcdonaldsPassed == null) {
            this.mcdonaldsPassed = 0
        }



        this.recentStarbucks = new Map();
        this.recentMcdonalds = new Map();

        // the position of the car
        // this is updated by the subscriptioins
        this.gpsPosition = { lat: 0, long: 0 }

        // let's build our interface


        this.holder = $("<div/>", { class: 'stuffGoesHere' }).appendTo(this.canvas)
        this.theDiv = $('<div id = "info" class = "container"/>').appendTo(this.holder);

        this.locDiv = $("<div/>", { class: 'box location' }).appendTo(this.theDiv)
        //appending to the locDiv appears to be impossible somehow

        
        this.starbucksDiv = $("<div/>", { class: 'box starbucks' }).appendTo(this.theDiv).text(' ');

        this.mcdonaldsDiv = $("<div/>", { class: 'box mcdonalds' }).appendTo(this.theDiv).text(' ');

        //TODO: make this on the bottom and spaced properly
        this.overallDiv = $("<div/>", { class: 'overall' }).appendTo(this.holder).text(' ');


        // now let's get our data in place
        this.subscribe(VehicleData.gps.latitude, function (value) {
            this.setLat(value);
        }.bind(this));
        this.subscribe(VehicleData.gps.longitude, function (value) {
            this.setLong(value);
        }.bind(this));



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



                break;


            case "ccw":
            case "leftStart":

                break;

            /**
             * When the middle button is pressed, we will change the region
             * just for this application
             */

            case "selectStart":

                this.setRegion(this.getRegion() == "na" ? "eu" : "na");

                break;
        }

    },

    /**
     * (event) onRegionChange
     *
     * Called when the region is changed
     */

    onRegionChange: function (region) {


    },


    /***
     *** Applicaton specific methods
     ***/



    /**
     * (update gps Location)
     */

    setLong: function (_long) {
        this.gpsPosition.long = _long
        this.updateDisplay();
    },

    setLat: function (_lat) {
        this.gpsPosition.lat = _lat
        this.updateDisplay();
    },

    updateDisplay: function () {
        // now let's set the sections value

        this.locDiv.text('long: ' + this.gpsPosition.long + '\nlat: ' + this.gpsPosition.lat)

        nearestStarbucks = getNearestCoord(starbucksGPScoords, this.gpsPosition)
        this.addToNearbyCount(nearestStarbucks, this.recentStarbucks, this.starbucksPassed, 'starbucksPassed')
/*

        //check if the nearest starbucks is in detection range
        if (nearestStarbucks.distance < this.passedRange) {
            //if we have an entry for it we will check it, if not make a new one and add to the count.
            if (this.recentStarbucks.has(nearestStarbucks.coord.long)) {

                // check how long ago this starbucks was logged
                lastAccessed = this.recentStarbucks.get(nearestStarbucks.coord.long)
                msDiff = Math.abs(lastAccessed - new Date())

                // if it was less than the timeout(seconds) ago, just update it
                if (msDiff < 1000 * this.passedTimeout) {
                    this.recentStarbucks.set(nearestStarbucks.coord.long, new Date())
                } else {
                    // if it was longer than that, update it but also increment the count
                    this.recentStarbucks.set(nearestStarbucks.coord.long, new Date())
                    this.starbucksPassed++;
                    this.set('starbucksPassed', this.starbucksPassed )
                }
            } else {
                // if there is no entry, make one and increment count
                this.recentStarbucks.set(nearestStarbucks.coord.long, new Date())
                this.starbucksPassed++;
                this.set('starbucksPassed', this.starbucksPassed )

            }

        }
        */

        
        nearestMcdonalds = getNearestCoord(mcdonaldsGPSCoords, this.gpsPosition)
        this.addToNearbyCount(nearestMcdonalds, this.recentMcdonalds, this.mcdonaldsPassed, 'mcdonaldsPassed')




        this.starbucksDiv.text('nearest starbucks is at: ' + coodinateToString(nearestStarbucks.coord) + '\nDistance: ' + nearestStarbucks.distance + '\n count: ' + this.starbucksPassed)

        this.mcdonaldsDiv.text('nearest mcdonalds is at: ' + coodinateToString(nearestMcdonalds.coord) + '\nDistance: ' + nearestMcdonalds.distance+ '\n count: ' + this.mcdonaldsPassed)
        
        this.overallDiv.text('Starbucks:Mcdonalds: ' + this.starbucksPassed + ":" + this.mcdonaldsPassed + '     Starbucks/Mcdonalds: ' + (this.starbucksPassed / this.mcdonaldsPassed))

    },

    addToNearbyCount: function(nearestEstablishment, recentEstablishment, establishmentPassed, storageName){
        

        //TODO: a long car trip will accumulate memory of past starbucks/mcdonanalds, fix.

        //TODO: these if statements could be written in a better way

        if (nearestEstablishment.distance < this.passedRange) {
            //if we have an entry for it we will check it, if not make a new one and add to the count.
            if (recentEstablishment.has(nearestEstablishment.coord.long)) {

                // check how long ago this establishment was logged
                lastAccessed = recentEstablishment.get(nearestEstablishment.coord.long)
                msDiff = Math.abs(lastAccessed - new Date())
 
                // if it was less than the timeout(seconds) ago, just update it
                if (msDiff < 1000 * this.passedTimeout) {
                    recentEstablishment.set(nearestEstablishment.coord.long, new Date())
                } else {
                    // if it was longer than that, update it but also increment the count
                    recentEstablishment.set(nearestEstablishment.coord.long, new Date())
                    establishmentPassed++;
                    //save updated count
                    this.set(storageName, establishmentPassed )
                }
            } else {
                // if there is no entry, make one and increment count
                recentEstablishment.set(nearestEstablishment.coord.long, new Date())
                establishmentPassed++;
                //save updated count
                this.set(storageName, establishmentPassed)

            }

        }
        
    }




}));
