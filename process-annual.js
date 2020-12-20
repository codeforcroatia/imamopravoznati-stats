var Store = require('./lib/store'),
  raw = require('./raw-annual.json'),
  _ = require('underscore'),
  moment = require('moment'),
  fs = require('fs'),
  store,
  today = moment(),
  year = today.year();   // i.e. 2020;


store = new Store({
  from: raw.from,
  site: raw.site,
  to: raw.to
});

_.each(raw.db, function(request) {
  store.save(request);
});

fs.writeFile('processed-'+year+'.json', JSON.stringify(store.getOptions()), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
