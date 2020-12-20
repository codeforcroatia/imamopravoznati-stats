var Store = require('./lib/store'),
  raw = require('./raw-monthly.json'),
  _ = require('underscore'),
  moment = require('moment'),
  fs = require('fs'),
  store,
  today = moment(),
  year = today.year(),   // i.e. 2020
  month = today.month()+1;     // i.e. 10 (Month is 0-based, so 10 means 11th Month), so we add +1;


store = new Store({
  from: raw.from,
  site: raw.site,
  to: raw.to
});

_.each(raw.db, function(request) {
  store.save(request);
});

fs.writeFile('processed-'+year+'-'+month+'.json', JSON.stringify(store.getOptions()), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
