1. start a cloudSQL postgres instance
   ![image](https://github.com/button-inc/twu-ctl-chart/assets/72329369/01e8743c-d482-47c9-a1b7-9219df70519b)
   ![image](https://github.com/button-inc/twu-ctl-chart/assets/72329369/8374e0b0-4da6-4b67-be71-143f370ece55)
   
   get the connection name
   ![image](https://github.com/button-inc/twu-ctl-chart/assets/72329369/4f1c221a-0c4c-4cf2-9173-c3cc84050dc4)



3. start a VM in GCP GCE
   ![image](https://github.com/button-inc/twu-ctl-chart/assets/72329369/fac60ee1-5f6f-4869-bd37-983534c3a0a1)
   ![image](https://github.com/button-inc/twu-ctl-chart/assets/72329369/feb99cba-6812-487a-8d22-a9654273ef3c)

4. Set Up Docker on the VM Instance
```bash
     sudo apt-get update
     sudo apt-get install docker.io

     # Add User to the Docker Group
     sudo usermod -aG docker $USER
     newgrp docker

     # verify the membership
     groups

     # Start Docker service
     sudo systemctl start docker
     sudo systemctl enable docker

     # login to github container registry
     echo "[PersonalAccessTockenPAT]" | docker login ghcr.io -u [githubUsername] --password-stdin

     # pull the docker img from ghcr
     docker pull ghcr.io/button-inc/twu-ctl-chart:latest

```

4. Enable the Cloud SQL Admin API: [Enable Cloud SQL Admin API](https://console.developers.google.com/apis/api/sqladmin.googleapis.com/overview?project=1084067978523).

5. Connect with CloudSQL from the VM Instance
```bash
      # Create the Directory in Your Home Folder
      mkdir ~/cloudsqlproxy

      #Start Cloud SQL Proxy
      # keep Cloud SQL Proxy running even after the SSH session ends
      nohup ./cloud_sql_proxy -dir=/home/patrick/cloudsql -instances=goog-cloud-infrastructure:us-central1:twu-pat-db &

      # Test the connection with postgres
      psql -h /home/patrick/cloudsql/goog-cloud-infrastructure\:us-central1\:twu-pat-db -U postgres -d twu_pat_db


```

6. Docker Run
```bash
      # run the docker img
      # pass in the env variables
      # set the DB_HOST to cloudSQL proxy
      docker run -d -p 80:3000 --name myapp \
      -v /home/patrick/cloudsql:/cloudsql \
      -e DB_USER=postgres \
      -e DB_HOST=/cloudsql/goog-cloud-infrastructure:us-central1:twu-pat-db \
      -e DB_NAME=twu_pat_db \
      -e DB_PASSWORD=twu-db-pw \
      -e DB_PORT=5432 \
      ghcr.io/button-inc/twu-ctl-chart:latest

      # tips
      # to stop the container
      docker stop myapp
      # to remove the container
      docker rm myapp

```

