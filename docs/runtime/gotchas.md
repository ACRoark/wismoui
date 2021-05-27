# Gotchas

These are some of the things to be aware of when building, deploying and running the application.

- [Gotchas](#gotchas)
  - [Starting the Docker container after a failure](#starting-the-docker-container-after-a-failure)
  - [Ports are not available](#ports-are-not-available)

## Starting the Docker container after a failure

Sometimes an error can occur while starting the Docker container. You may receive an error message when you try to start the container again. This messages will say something like,

```
docker: Error response from daemon: Conflict. The container name "/wismoui" is already in use by container "561e7b01e09a2f60fe936d2cb9a759fe8aeacc4cc340319fd303b48d4af4da0b". You have to
remove (or rename) that container to be able to reuse that name.
```

To resolve this, you'll need to remove the existing container by running the following command to get the container ID:

```
npm run docker:list
```

Then, using the ID for the `wismoui` container, execute:

```
npm run docker:remove <ID>
```

## Ports are not available

If you have another application, such as Internet Information Services (IIS) running on your Windows PC, port 80 is most likely being used by that process and you'll see an error message like:

```
docker: Error response from daemon: Ports are not available: listen tcp 0.0.0.0:80: bind: An attempt was made to access a socket in a way forbidden by its access permissions.
```

To resolve this:

1. Open a Command Window <ins>as an administrator</ins>.
2. Find the process ID (PID) of the application listening on port 80, run the following command:
   ```
   netstat -ano
   ```
3. Scroll through the list and find the entry where the Local Address is `0.0.0.0:80` and note the value in the PID column.
4. Start Windows Task Manager and select the Processes tab.
5. If the _PID_ column is not displayed, from the _View_ menu select _Select Columns_. In the _Select Columns_ dialog, turn on the _PID (Process Identifier)_ check box and then click **OK**.
6. Locate the process matching the PID that is using 0.0.0.0:80.
7. Make sure that it is safe to shut down the process and then shut it down.

NOTE: The most likely culprit is IIS. This service and all of it dependencies can be stopped using the `net stop http` command.

You should change the behavior of these services to Manual in the Service Control Manager (or Services tab of the Windows Task Manager).
