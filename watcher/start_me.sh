#!/bin/bash

readarray -t json_coin_list < "coin-list.txt"
formatted_pairs=("${json_coin_list[@]//[[:punct:]]}")
read -r -a pair_array <<< "${formatted_pairs[@]}"
echo "${pair_array[@]}"

for pair in "${pair_array[@]}"; do
  container_name="coin_watcher_${pair}"
  docker run --rm --name "$container_name" --network db_net coin_watcher "$pair" &

done