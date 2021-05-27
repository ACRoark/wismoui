<img  src="https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/70706303_10157461057676465_6761746745589235712_n.png?_nc_cat=111&_nc_sid=85a577&_nc_ohc=SWpzNbKEP7QAX98o3Z1&_nc_ht=scontent-ort2-1.xx&oh=bdfffa1017a3073c12e63bd63cd58f03&oe=5EA9612C" align="center" alt="DTE Energy" height="150"/>

# MIMO - WISMO Tracker

![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiZG8yYm5tNHowME9zTVQ0ZlQ2MU1Eemc4ZmNETTU5bzcwbzlhcVNOYmhENWpnYUpBZ1RTbTF1eVlUNU81NVVodExNQUxPcDJLb0FmK1l3cDRYdTg2a0dVPSIsIml2UGFyYW1ldGVyU3BlYyI6InhLc3JiU1F2OHZTblpuVUQiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

Move-In/Move-Out - Where is My Order Tracker is an interactive user interface displaying current status information for orders submitted by customers requesting service be turned on (started), turned off (stopped) or transferred between premises.

Azure DevOps project: [https://dev.azure.com/dteenergy/WISMO](https://dev.azure.com/dteenergy/WISMO)

---

**Contents**

- [Getting Started](#getting-started)
- [Running Locally](#running-locally)
- [Documentation](#documentation)
- [See Also](#see-also)

## Getting Started

### Prerequisites

Perform the following steps to setup your development environment:

- Install Git: [https://git-scm.com/downloads](https://git-scm.com/downloads)
- If preferred, download and install a Git Client like [SourceTree](https://www.sourcetreeapp.com/), [GitKraken](https://www.gitkraken.com/), [ConEmu](https://conemu.github.io/), etc.
- Install node.js (v13 or later): [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- Install IDE of choice
  - Visual Studio Code: [https://code.visualstudio.com/download](https://code.visualstudio.com/download)
  - WebStorm: [https://www.jetbrains.com/webstorm/download/](https://www.jetbrains.com/webstorm/download/)
- Install Docker [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

### Get the Code

You can start coding on this project by following these steps:

- Using the command-line:

  - Change the working directory to your local source control folder. For instance, if all source code resides in a “git” folder on your C:-drive, type “cd /c/git”. Be sure to include any subfolders, if applicable.

  - Clone your repository:

    ```shell
    git clone https://github.com/dteenergy/wismo-ui.git
    ```

  - Change the working directory to the new “wismo-ui” folder where the repository was cloned.
    ```shell
    cd wismo-ui
    ```

Commit changes often (daily).

When you are ready to submit your changes to the **master** branch, create a Pull Request. This will initiate the code review process and the Pull Request will either be accepted, meaning your changes are merged into the **master** branch, or rejected so you can make additional changes.

#### Remember to Fetch/Pull from the remote repo to keep your code in-sync with other developers.

## Running Locally

If you working on a Windows PC, follow these steps to run the application locally. Mac users should click [here](docs/runtime/docker-mac.md).

- Find the local ip address of the network adapter you are using to connect to the internet.

  - Determine if you are using a wifi adapter or an ethernet adapter, you want the ip address assigned to the one you are using.

  - If using windows:

    - Open a cmd terminal

      ```shell
      ipconfig
      ```

    - Find the adapter you are using, make sure it is the right adapter, not docker or something else. //192.168.1.108
    - Take note of the ip address with the Key of IPv4, most likely will start with 192 or 172 or 10
    - This address will be used below to edit your system's host file.

  - Add a line to the bottom of your `c:\Windows\System32\Drivers\etc\hosts` file as administrator

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
  _TODO: Need to decide if the default should be running in docker_

  ```shell
  npm run docker:build
  ```

  This build step is only needed once on your computer unless we make a change to the dockerfile or the nodejs version.

- Start the application:
  _TODO: Need to decide if the default should be running in docker_

  ```shell
  npm run docker:start
  ```

- Your OS will ask for permission to allow folder share. Permit this.

- Your local folder is mounted in the docker image now, changes here should be reflected in the image.
- View the application in a INCOGNITO browser by navigating to http://dev.orderstatus.dteenergy.com:81

See this page for any [gotchas](#docs/runtime/gotchas.md)

### Stopping the Container

When done exit the docker process in the terminal with the below key press and stop container.

- In the terminal where the container is running, press `CTRL-c`

Windows doesn't trap CRTL-c in this situation properly so you will have to execute a couple of additional commands; otherwise, the container will continue to run and bind to port 80.

- Find the container id where the image name is wismoui:

  ```shell
  npm run docker:list
  ```

- Stop the container
  ```shell
  npm run docker:stop <ID>
  ```

See this page for any [gotchas](#docs/runtime/gotchas.md)

## Documentation

See the full set of [documentation](docs) for more details.

## See Also

- [Firebase](./docs/firebase.md)
- https://github.com/yahoo/react-intl/wiki
