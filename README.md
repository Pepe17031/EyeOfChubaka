1) Create non-root user:
    adduser newuser  # Create user
    usermod -aG sudo newuser  # Add privileges

2) Install Docker:
https://docs.docker.com/engine/install/ubuntu/

docker run --rm --name coin_watcher --network db_net coin_watcher ETHUSDT

docker build -t coin_watcher . 


