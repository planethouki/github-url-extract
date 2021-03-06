module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    const date = new Date(Date.now() - 3600*1000);
    const prefix = date.getUTCFullYear() + "-" + 
        "0".concat((date.getUTCMonth() + 1)).substr(-2) + "-" + 
        "0".concat(date.getUTCDate()).substr(-2) + "T" + 
        "0".concat(date.getUTCHours()).substr(-2);
    context.log(`prefix: ${prefix}`);

    if (req.body && req.body.length > 0) {
        const events = req.body;
        context.res = {
            // status: 200, /* Defaults to 200 */
            headers: {
                'Content-Type': 'application/json'
            },
            // body: events.map(eventParse)
            body: events.filter(event => event.created_at.startsWith(prefix))
        };
    } else {
        context.res = {
            status: 400,
            body: "Please pass body"
        };
    }
};