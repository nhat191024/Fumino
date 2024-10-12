const fs = require('fs');
const path = require('path');
const events = [];
let dateNow = Date.now();

module.exports = (fumino) => {
    const eventsPath = path.join(__dirname, '../Events');
    const eventsFile = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    console.log("[x] :: ".magenta + "Now starting loading events...".brightYellow);
    for (const file of eventsFile) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        events.push(event);
        if (event.once) {
            fumino.once(event.name, (...args) => event.execute(...args));
        } else {
            fumino.on(event.name, (...args) => event.execute(...args));
        }
    }
    console.log("[x] :: ".magenta + `Loaded ${events.length} events after: `.brightGreen + `${Date.now() - dateNow}ms`.green);
    console.log('\n');
}
