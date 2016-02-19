/* scraper.js */

/* author: Craig Fisk, craigfisk@picocosmos.net
   date: 20160128
   usage: node scraping.js
   summary: Checks either of two Kaiser Permanente doctor files (saved as test examples), scraping for
   whether the doctor is accepting new patients or not, writes the result to kp.json
   and alerts the user, if changed.
   Loosely modelled on http://timmknight.github.io/2015/scraping-the-web-with-node/
   Test files: Wang is true ("Yes, I'm accepting..."); Guempel is false ("Sorry, I'm not accepting...")
   Note: these two files are in ~/virt/www.kp-dev.org. In that directory, run:
       python -m SimpleHTTPServer 8888
*/
"use strict";

// See https://www.twilio.com/user/account/messaging/getting-started
// Phone number for testing/development ("From: " below): +15036789186
var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_TOKEN;

var fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio'),
    client = require('twilio')(accountSid, authToken);

//var url = 'http://localhost:8888/Wang.html';
//var url = 'http://localhost:8888/Guempel.html';
//var url = 'http://www.amazon.co.uk/gp/product/1118531647';

function handleError (err) {
  console.log('Failed with ', err.message, err.stack);
}

exports.scrape = function (url) {
  console.log('At start of scrape(), typeof url: ' + typeof url);
  console.log('At start of scrape(), url: ' + url);
  /*
  var options = {
    url: url, //urlparse(url),
    //headers: { 'User-Agent': 'request'},
    //port: 8888,
    //hostname: 'localhost',
    method: 'GET'
  };
  */
  request.get(url, function(error, response, html) {
    var json = {
      accepting: ''
    };
    if (error) return handleError(error);
    if (!error && response.statusCode != 200)
      return console.log('No error but statusCode != 200; instead it is: ' + response.statusCode);
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      console.log('In scrape(), html is: ' + html);


      var accepting = false;
      $('.MDsummaryActions').each(function() {
        var yes_pattern = /^Yes.*/i;
        var text = $(this).find('.wppErrorPage div p').text().trim();
        accepting = yes_pattern.test(text);
        if (accepting) json.accepting = true;
        else json.accepting = false;
        try {
          fs.readFile('kp.json', function(err, data) {
            if (err) return handleError(err); //throw err;
            if (!data) return console.log('In scale(), kp.json has no data');
            var obj = JSON.parse(data);
            if (obj.accepting != json.accepting) {
              console.log('Accepting has changed, sending text msg!');

              client.sms.messages.create({
                body: "Accepting new patients has changed to: " + json.accepting + " from " + obj.accepting,
                to: "+15038874242",
                from: "+15036789186" // "+15005550009" // = successful
              }, function(err, sms) {
                if (err) console.error(err);
                else {
                  //process.stdout.write(sms.sid);
                  //for (var prop in sms) { console.log(prop + " " + sms[prop]); }
                }
              });
              fs.writeFile('kp.json', JSON.stringify(json, null, 4), function(err) {
                if (err) throw err;
                console.log('New value for accepting saved in kp.json file');
              });
            }
        });
        } catch (e) {
          console.log('********** catch, i.e. could not readFile kp.json');
          return handleError(e);
        } finally {
          //console.log('********** finally in scrape');
        }
      });

    }
  });
};
