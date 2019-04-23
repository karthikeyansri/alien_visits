# JavaScript and DOM Manipulation

## Background

WAKE UP SHEEPLE! The extra-terrestrial menace has come to Earth and people at `ALIENS-R-REAL` (here by will be referenced as `THEY`) have collected all of the eye-witness reports 'THEY' could to prove it! All 'THEY' need to do now is put this information online for the world to see and then the matter will finally be put to rest.

There is just one tiny problem though... 'THEIR' collection is too large to search through manually. Even 'THEIR' most dedicated followers are complaining that they are having trouble locating specific reports in this mess.

That's why I was hired. 'THEY' wanted me to write code that will create a table dynamically based upon a [dataset they provide](./static/js/data.js). 'THEY' also wanted to allow website's users to filter the table data for specific values. There's a catch though... I am only to use pure JavaScript, HTML, and CSS, and D3.js on the web pages. They are the only coding languages which can be trusted.

I can handle this... right? The planet Earth needs to know what 'THEY' have found!

## Task

### Level 1: Automatic Table and Date Search

* Create a basic HTML web page or use the [index.html](./index.html) file provided ('THEY' recommend building your own custom page!). I have used what I was provided with and did some small modifications.

* Using the UFO dataset provided in the form of an array of JavaScript objects, I wrote code that appends a table to the web page and then adds new rows of data for each UFO sighting.

  * I have to make sure that the table has a column for `date/time`, `city`, `state`, `country`, `shape`, and `comment` at the very least.

* Use a date form in the HTML document and write JavaScript code that will listen for events and search through the `date/time` column to find rows that match user input.

### Level 2: Multiple Search Categories (Optional)

* Complete all of Level 1 criteria.

* Using multiple `input` tags and/or select dropdowns, I wrote a small JavaScript code so the user can to set multiple filters and search for UFO sightings using the following criteria based on the table columns:

  1. `date/time`
  2. `city`
  3. `state`
  4. `country`
  5. `shape`

- - -

### Dataset

* [UFO Sightings Data](./static/js/data.js)

## Libraries: 
* bootstrap.js; d3.js; BASIC HTML; CSS; jvascript
