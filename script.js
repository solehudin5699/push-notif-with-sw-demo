const checkPermission = async () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('No Service Worker support!');
  }

  if (!('Notification' in window)) {
    throw new Error('No Notification support!');
  }
};

const registerSW = async () => {
  // navigator.serviceWorker.getRegistrations().then((registrations) => {
  //   for (let registration of registrations) {
  //     registration.unregister();
  //   }
  // });
  // const reg = await navigator.serviceWorker.ready;
  // console.log(reg.active);
  const swRegistration = await navigator.serviceWorker.register('sw.js');
  return swRegistration;
};

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Permission not granted for Notification');
  }
};

const main = async () => {
  await checkPermission();
  await requestNotificationPermission();
  await registerSW();
};
main();
