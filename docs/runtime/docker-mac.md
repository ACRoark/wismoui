## Running Locally

- Find the local ip address of the network adapter you are using to connect to the internet.
  - Determine if you are using a wifi adapter or an ethernet adapter, you want the ip address assigned to the one you are using.
    - Open a terminal
      ```shell
      ifconfig
      ```
    - Find the adapter you are using, make sure it is the right adapter, not docker or something else.
    - Take note of the ip address with the Key of IPv4, most likely will start with 192 or 172 or 10
    - This address will be used below to edit your system's host file.
  - Add a line to the bottom of your `/etc/hosts` file as administrator
    ```shell
    <the local ipaddress of your network adapter or wifi> dev.orderstatus.dteenergy.com
    ```
    EXAMPLE: `172.16.0.50 dev.orderstatus.dteenergy.com`
    Remember to remove this hosts record when not using it
- Install all package dependencies using NPM:

  ```shell
  npm install
  ```

- Build Docker Image

  ```shell
  npm run docker:build
  ```

  This build step is only needed once on your computer unless we make a change to the dockerfile or the nodejs version.

- Start the application:

  ```shell
  npm run docker:start:mac
  ```

- Your local folder is mounted in the docker image now, changes here should be reflected in the image.
- View the application in a INCOGNITO browser by navigating to http://dev.orderstatus.dteenergy.com

### Stopping the Container

When done exit the docker process in the terminal with the below key press and stop container.

- In the terminal where the container is running, press `CTRL-c`

- Start the application:

  ```shell
  npm run docker:stop:mac
  ```
