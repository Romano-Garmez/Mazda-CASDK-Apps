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
        this.lat = 0;
        this.long = 0;
        // let's build our interface


        this.holder = $("<div/>", { class: 'stuffGoesHere' }).appendTo(this.canvas)
        this.theDiv = $('<div id = "info" class = "container"/>').appendTo(this.holder);



        this.locDiv = $("<div/>", { class: 'box location' }).appendTo(this.theDiv).text(' ');

        this.bucksDiv =$("<div/>", { class: 'box starbucks' }).appendTo(this.theDiv).text(' ');

        this.naldsDiv = $("<div/>", { class: 'box mcdonalds' }).appendTo(this.theDiv).text(' ');

        //TODO: make this on the bottom and spaced properly
        $("<div/>", {class: 'overall'}).appendTo(this.holder).text(' 11111\n111');


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
        this.long = _long
        this.updateGPS_position();
    },

    setLat: function (_lat) {
        this.lat = _lat
        this.updateGPS_position();
    },

    updateGPS_position: function () {
        // now let's set the sections value

        this.locDiv.text('long: ' + this.long + '\nlat: ' + this.lat)

    },





}));
