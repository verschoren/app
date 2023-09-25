var client = ZAFClient.init();

init();

async function init() {
    var metadata = await client.metadata();
    
    var vip_tag = metadata.settings.vip_tag != '' ? metadata.settings.vip_tag : 'vip';
    var message = metadata.settings.message != '' ? metadata.settings.message : 'This user is a VIP';
    var sticky = metadata.settings.sticky != '' ? metadata.settings.sticky : false;

    var requester = await client.get('ticket.requester');
    var tags = requester['ticket.requester'].tags;
    
    var isVIP = tags.includes(vip_tag);
    
    if (isVIP){
        client.invoke('notify', message, {sticky: sticky});
    }
}