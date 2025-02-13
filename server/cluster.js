const cluster = require("cluster");
const os = require("os");

const numCPUs = os.cpus().length;

module.exports = async function startCluster(serverStartCallback) {
  if (cluster.isPrimary) {
    console.log(`Master process ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork(); // Creates a new worker to replace the crashed one
    });
  } else {
    serverStartCallback();
  }
};
