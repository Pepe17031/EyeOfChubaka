docker-compose down --volumes

docker run --rm --name coin_watcher --network db_net coin_watcher ETHUSDT

docker build -t coin_watcher . 
