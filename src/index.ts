import { ExpressApp } from "./server";
import { config } from "./config/config";

const PORT = config.APP_PORT;

export const StartServer = async () => {
  const expressApp = await ExpressApp();
  expressApp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  process.on("uncaughtException", async err => {
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("server is up");
});
