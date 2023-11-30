const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const saveSubscription = async (subscription) => {
  const SERVER_URL = 'http://localhost:3000/save-subscription';
  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  });
  return response.json();
};

self.addEventListener('activate', async () => {
  const subscription = await self?.registration?.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(
      'BMIsWnxIKP7VyelHgnbGp2tmffmPqueivKVhvxF-fqFq5KxffM0Kfb22-aVoVXWXL6f65MMSpPYmCCWbt0rzras' // VAPID PUBLIC KEY
    ),
  });
  try {
    const response = await saveSubscription(subscription);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});

self.addEventListener('push', (event) => {
  const payload = event.data ? event.data.text() : 'no payload';

  // self.registration.showNotification('Hello, world!', {
  //   body: payload,
  // });

  event.waitUntil(
    self.registration.showNotification('Hello', {
      body: payload,
    })
  );
});
