var connection: chrome.runtime.Port;

window.addEventListener('message', (msg) =>
{
    if (msg.data.fromPolyfillOnPortalSide)
    {
        openConnection().postMessage(msg.data);
    }
});

function openConnection(port?: any)
{
    if (!connection || port)
    {
        connection = chrome.runtime.connect({ name: 'polyfill' });
        connection.onMessage.addListener((msg, port) =>
        {
            msg.fromPolyfillOnExtensionSide = true;
            window.postMessage(msg, "*");
        });
        connection.onDisconnect.addListener(openConnection);
    }
    return connection;
}