# Editing Your Hosts File

Because...

## Get Your IP Address

Find the local ip address of the network adapter you are using to connect to the internet.

- Determine if you are using a wifi adapter or an ethernet adapter, you want the ip address assigned to the one you are using.
- If using windows:

  - Open a cmd terminal

    ```shell
    ipconfig
    ```

  - Find the adapter you are using, make sure it is the right adapter, not docker or something else.
  - Take not of the ip address with the Key of IPv4, most likely will start with 192 or 172 or 10
  - This address will be used below to edit your system's host file.

- If using mac or linux:

  - Open a cmd terminal

    ```shell
    ifconfig
    ```

  - Find the adapter you are using, make sure it is the right adapter, not docker or something else.
  - Take not of the ip address with the Key of IPv4, most likely will start with 192 or 172 or 10
  - This address will be used below to edit your system's host file.

## Update the Hosts File

Edit hosts file to point `dev.orderstatus.dteenergy.com` to your local network adapter ip address.

- If windows, add a line to the bottom of your `c:\Windows\System32\Drivers\etc\hosts` file as administrator

  ```shell
  <the local ipaddress of your network adapter or wifi> dev.orderstatus.dteenergy.com
  ```

  EXAMPLE: `172.16.0.50 dev.orderstatus.dteenergy.com`

- If Mac or Linux, add a line to the bottom of your `/etc/hosts` file as root

  ```shell
  <the local ipaddress of your network adapter or wifi> dev.orderstatus.dteenergy.com
  ```

  EXAMPLE: `172.16.0.50 dev.orderstatus.dteenergy.com`

Remember to remove this hosts record when not using it
