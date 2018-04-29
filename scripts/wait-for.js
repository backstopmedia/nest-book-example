const waitPort = require('wait-port');

async function wait() {
  const [host, port] = process.env.AMQP_URL.split('@')[1].split(':');
  await waitPort({
    host,
    port: Number(port),
    timeout: 10000
  });
}

wait();
